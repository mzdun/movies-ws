import json
import os
import sys
from pprint import pprint

__dir__ = os.path.dirname(__file__)

LANGS = [
    "pl",
    "en-US",
]

SHORT = set(lang.split("-", 1)[0] for lang in LANGS)

NAMES_WITH_PREVIOUS_MEANING = ["IN"]


def orig(name: str) -> str:
    if name[-1] == "_":
        code = name[:-1]
        if code in NAMES_WITH_PREVIOUS_MEANING:
            return code
    return name


definitions = {}
translations = {}

for LANG in SHORT:
    translations[LANG] = {}
    with open(os.path.join(__dir__, LANG, "countries.json"), encoding="UTF-8") as f:
        for region in json.load(f):
            alpha2 = region["alpha2"].upper()
            name = region["name"]
            if alpha2 in NAMES_WITH_PREVIOUS_MEANING:
                alpha2 = f"{alpha2}_"
            translations[LANG][alpha2] = name
            definitions[alpha2] = name

    with open(os.path.join(__dir__, LANG, "world.json"), encoding="UTF-8") as f:
        for region in json.load(f):
            alpha2 = region["alpha2"].upper()
            name = region["name"]
            if alpha2 in NAMES_WITH_PREVIOUS_MEANING:
                alpha2 = f"{alpha2}_"
            translations[LANG][alpha2] = name
            definitions[alpha2] = name

with open(os.path.join(__dir__, "regions-patch.json"), encoding="UTF-8") as f:
    patch = json.load(f)
    for code in patch:
        langs = list(patch[code].keys())
        patches = patch[code]

        alpha2 = code
        if alpha2 in NAMES_WITH_PREVIOUS_MEANING:
            alpha2 = f"{alpha2}_"
        for lang in langs:
            if lang not in SHORT:
                continue
            translations[lang][alpha2] = patches[lang]
        try:
            definitions[alpha2]
        except KeyError:
            definitions[alpha2] = patch[code]["en"]

with open(os.path.join(__dir__, "..", "strings", "regions.lngs"), "wb") as f:
    f.write(
        """[
    project("movies-ws"),
	namespace("movies::region"),
    version("latest"),
    serial(1)
] strings {
""".encode(
            "UTF-8"
        )
    )

    for code in sorted(definitions.keys()):
        help = (
            f"Localized name for {orig(code)}"
            if code != "VARIOUS"
            else "Localized name for various countries"
        )
        id = code.replace("-", "_")
        default = definitions[code]

        f.write(
            f"""	[help("{help}"), id(-1)] {id} = "{default}";
""".encode(
                "UTF-8"
            )
        )

    f.write(
        """}
""".encode(
            "UTF-8"
        )
    )

if len(sys.argv) > 1:
    bindir = sys.argv[1]
    os.makedirs(bindir, exist_ok=True)
    with open(os.path.join(bindir, "mapping.hh"), "wb") as f:
        f.write(
            """// THIS FILE IS AUTOGENERATED
#pragma once
#include <regions/lngs.hh>

using namespace std::literals;

namespace movies::region {
\tstruct region_name {
\t\tstd::string_view id;
\t\tlng code;
\t};

\tconstexpr region_name names[] = {
""".encode(
                "UTF-8"
            )
        )

        for code in sorted(definitions.keys()):
            help = (
                f"Localized name for {orig(code)}"
                if code != "VARIOUS"
                else "Localized name for various countries"
            )
            id = code.replace("-", "_")

            f.write(
                f"""		{{ "{orig(code)}"sv, lng::{id} }},
""".encode(
                    "UTF-8"
                )
            )

        f.write(
            """\t};
}  // namespace movies::region
""".encode(
                "UTF-8"
            )
        )

for lang in LANGS:
    try:
        tr = translations[lang]
    except KeyError:
        try:
            tr = translations[lang.split("-", 1)[0]]
        except KeyError:
            continue

    os.makedirs(os.path.join(__dir__, "..", "translations", "regions"), exist_ok=True)
    with open(
        os.path.join(__dir__, "..", "translations", "regions", f"{lang}.po"), "wb"
    ) as f:
        f.write(
            f"""#, fuzzy
msgid ""
msgstr ""
"Project-Id-Version: movies-ws latest\\n"
"Report-Msgid-Bugs-To: \\n"
"Language: {lang}\\n"
"MIME-Version: 1.0\\n"
"Content-Type: text/plain; charset=UTF-8\\n"
"Content-Transfer-Encoding: 8bit\\n"
""".encode(
                "UTF-8"
            )
        )
        for code in tr:
            help = (
                f"Localized name for {orig(code)}"
                if code != "VARIOUS"
                else "Localized name for various countries"
            )
            id = code.replace("-", "_")
            default = definitions[code]
            translation = tr[code]

            f.write(
                f"""
#. {help}
msgctxt "{id}"
msgid "{default}"
msgstr "{translation}"
""".encode(
                    "UTF-8"
                )
            )
