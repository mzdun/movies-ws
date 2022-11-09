/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
(function(global, factory) { /* global define, require, module */

    /* AMD */ if (typeof define === 'function' && define.amd)
        define(["protobufjs/minimal"], factory);

    /* CommonJS */ else if (typeof require === 'function' && typeof module === 'object' && module && module.exports)
        module.exports = factory(require("protobufjs/minimal"));

})(this, function($protobuf) {
    "use strict";

    // Common aliases
    var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;
    
    // Exported root namespace
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    
    $root.movies = (function() {
    
        /**
         * Namespace movies.
         * @exports movies
         * @namespace
         */
        var movies = {};
    
        movies.db = (function() {
    
            /**
             * Namespace db.
             * @memberof movies
             * @namespace
             */
            var db = {};
    
            db.v1 = (function() {
    
                /**
                 * Namespace v1.
                 * @memberof movies.db
                 * @namespace
                 */
                var v1 = {};
    
                v1.GetListingRequest = (function() {
    
                    /**
                     * Properties of a GetListingRequest.
                     * @memberof movies.db.v1
                     * @interface IGetListingRequest
                     * @property {Array.<movies.filters.v1.IFilter>|null} [filters] GetListingRequest filters
                     * @property {Array.<string>|null} [sort] GetListingRequest sort
                     * @property {string|null} [search] GetListingRequest search
                     */
    
                    /**
                     * Constructs a new GetListingRequest.
                     * @memberof movies.db.v1
                     * @classdesc Represents a GetListingRequest.
                     * @implements IGetListingRequest
                     * @constructor
                     * @param {movies.db.v1.IGetListingRequest=} [properties] Properties to set
                     */
                    function GetListingRequest(properties) {
                        this.filters = [];
                        this.sort = [];
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * GetListingRequest filters.
                     * @member {Array.<movies.filters.v1.IFilter>} filters
                     * @memberof movies.db.v1.GetListingRequest
                     * @instance
                     */
                    GetListingRequest.prototype.filters = $util.emptyArray;
    
                    /**
                     * GetListingRequest sort.
                     * @member {Array.<string>} sort
                     * @memberof movies.db.v1.GetListingRequest
                     * @instance
                     */
                    GetListingRequest.prototype.sort = $util.emptyArray;
    
                    /**
                     * GetListingRequest search.
                     * @member {string|null|undefined} search
                     * @memberof movies.db.v1.GetListingRequest
                     * @instance
                     */
                    GetListingRequest.prototype.search = null;
    
                    // OneOf field names bound to virtual getters and setters
                    var $oneOfFields;
    
                    /**
                     * GetListingRequest _search.
                     * @member {"search"|undefined} _search
                     * @memberof movies.db.v1.GetListingRequest
                     * @instance
                     */
                    Object.defineProperty(GetListingRequest.prototype, "_search", {
                        get: $util.oneOfGetter($oneOfFields = ["search"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });
    
                    /**
                     * Creates a new GetListingRequest instance using the specified properties.
                     * @function create
                     * @memberof movies.db.v1.GetListingRequest
                     * @static
                     * @param {movies.db.v1.IGetListingRequest=} [properties] Properties to set
                     * @returns {movies.db.v1.GetListingRequest} GetListingRequest instance
                     */
                    GetListingRequest.create = function create(properties) {
                        return new GetListingRequest(properties);
                    };
    
                    /**
                     * Encodes the specified GetListingRequest message. Does not implicitly {@link movies.db.v1.GetListingRequest.verify|verify} messages.
                     * @function encode
                     * @memberof movies.db.v1.GetListingRequest
                     * @static
                     * @param {movies.db.v1.IGetListingRequest} message GetListingRequest message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    GetListingRequest.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.filters != null && message.filters.length)
                            for (var i = 0; i < message.filters.length; ++i)
                                $root.movies.filters.v1.Filter.encode(message.filters[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                        if (message.sort != null && message.sort.length)
                            for (var i = 0; i < message.sort.length; ++i)
                                writer.uint32(/* id 2, wireType 2 =*/18).string(message.sort[i]);
                        if (message.search != null && Object.hasOwnProperty.call(message, "search"))
                            writer.uint32(/* id 3, wireType 2 =*/26).string(message.search);
                        return writer;
                    };
    
                    /**
                     * Encodes the specified GetListingRequest message, length delimited. Does not implicitly {@link movies.db.v1.GetListingRequest.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof movies.db.v1.GetListingRequest
                     * @static
                     * @param {movies.db.v1.IGetListingRequest} message GetListingRequest message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    GetListingRequest.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a GetListingRequest message from the specified reader or buffer.
                     * @function decode
                     * @memberof movies.db.v1.GetListingRequest
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {movies.db.v1.GetListingRequest} GetListingRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    GetListingRequest.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.movies.db.v1.GetListingRequest();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                if (!(message.filters && message.filters.length))
                                    message.filters = [];
                                message.filters.push($root.movies.filters.v1.Filter.decode(reader, reader.uint32()));
                                break;
                            case 2:
                                if (!(message.sort && message.sort.length))
                                    message.sort = [];
                                message.sort.push(reader.string());
                                break;
                            case 3:
                                message.search = reader.string();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes a GetListingRequest message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof movies.db.v1.GetListingRequest
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {movies.db.v1.GetListingRequest} GetListingRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    GetListingRequest.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a GetListingRequest message.
                     * @function verify
                     * @memberof movies.db.v1.GetListingRequest
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    GetListingRequest.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        var properties = {};
                        if (message.filters != null && message.hasOwnProperty("filters")) {
                            if (!Array.isArray(message.filters))
                                return "filters: array expected";
                            for (var i = 0; i < message.filters.length; ++i) {
                                var error = $root.movies.filters.v1.Filter.verify(message.filters[i]);
                                if (error)
                                    return "filters." + error;
                            }
                        }
                        if (message.sort != null && message.hasOwnProperty("sort")) {
                            if (!Array.isArray(message.sort))
                                return "sort: array expected";
                            for (var i = 0; i < message.sort.length; ++i)
                                if (!$util.isString(message.sort[i]))
                                    return "sort: string[] expected";
                        }
                        if (message.search != null && message.hasOwnProperty("search")) {
                            properties._search = 1;
                            if (!$util.isString(message.search))
                                return "search: string expected";
                        }
                        return null;
                    };
    
                    /**
                     * Creates a GetListingRequest message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof movies.db.v1.GetListingRequest
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {movies.db.v1.GetListingRequest} GetListingRequest
                     */
                    GetListingRequest.fromObject = function fromObject(object) {
                        if (object instanceof $root.movies.db.v1.GetListingRequest)
                            return object;
                        var message = new $root.movies.db.v1.GetListingRequest();
                        if (object.filters) {
                            if (!Array.isArray(object.filters))
                                throw TypeError(".movies.db.v1.GetListingRequest.filters: array expected");
                            message.filters = [];
                            for (var i = 0; i < object.filters.length; ++i) {
                                if (typeof object.filters[i] !== "object")
                                    throw TypeError(".movies.db.v1.GetListingRequest.filters: object expected");
                                message.filters[i] = $root.movies.filters.v1.Filter.fromObject(object.filters[i]);
                            }
                        }
                        if (object.sort) {
                            if (!Array.isArray(object.sort))
                                throw TypeError(".movies.db.v1.GetListingRequest.sort: array expected");
                            message.sort = [];
                            for (var i = 0; i < object.sort.length; ++i)
                                message.sort[i] = String(object.sort[i]);
                        }
                        if (object.search != null)
                            message.search = String(object.search);
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a GetListingRequest message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof movies.db.v1.GetListingRequest
                     * @static
                     * @param {movies.db.v1.GetListingRequest} message GetListingRequest
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    GetListingRequest.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.arrays || options.defaults) {
                            object.filters = [];
                            object.sort = [];
                        }
                        if (message.filters && message.filters.length) {
                            object.filters = [];
                            for (var j = 0; j < message.filters.length; ++j)
                                object.filters[j] = $root.movies.filters.v1.Filter.toObject(message.filters[j], options);
                        }
                        if (message.sort && message.sort.length) {
                            object.sort = [];
                            for (var j = 0; j < message.sort.length; ++j)
                                object.sort[j] = message.sort[j];
                        }
                        if (message.search != null && message.hasOwnProperty("search")) {
                            object.search = message.search;
                            if (options.oneofs)
                                object._search = "search";
                        }
                        return object;
                    };
    
                    /**
                     * Converts this GetListingRequest to JSON.
                     * @function toJSON
                     * @memberof movies.db.v1.GetListingRequest
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    GetListingRequest.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    return GetListingRequest;
                })();
    
                v1.GetListingResponse = (function() {
    
                    /**
                     * Properties of a GetListingResponse.
                     * @memberof movies.db.v1
                     * @interface IGetListingResponse
                     * @property {Array.<movies.listing.v1.IMovieGroup>|null} [groups] GetListingResponse groups
                     */
    
                    /**
                     * Constructs a new GetListingResponse.
                     * @memberof movies.db.v1
                     * @classdesc Represents a GetListingResponse.
                     * @implements IGetListingResponse
                     * @constructor
                     * @param {movies.db.v1.IGetListingResponse=} [properties] Properties to set
                     */
                    function GetListingResponse(properties) {
                        this.groups = [];
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * GetListingResponse groups.
                     * @member {Array.<movies.listing.v1.IMovieGroup>} groups
                     * @memberof movies.db.v1.GetListingResponse
                     * @instance
                     */
                    GetListingResponse.prototype.groups = $util.emptyArray;
    
                    /**
                     * Creates a new GetListingResponse instance using the specified properties.
                     * @function create
                     * @memberof movies.db.v1.GetListingResponse
                     * @static
                     * @param {movies.db.v1.IGetListingResponse=} [properties] Properties to set
                     * @returns {movies.db.v1.GetListingResponse} GetListingResponse instance
                     */
                    GetListingResponse.create = function create(properties) {
                        return new GetListingResponse(properties);
                    };
    
                    /**
                     * Encodes the specified GetListingResponse message. Does not implicitly {@link movies.db.v1.GetListingResponse.verify|verify} messages.
                     * @function encode
                     * @memberof movies.db.v1.GetListingResponse
                     * @static
                     * @param {movies.db.v1.IGetListingResponse} message GetListingResponse message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    GetListingResponse.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.groups != null && message.groups.length)
                            for (var i = 0; i < message.groups.length; ++i)
                                $root.movies.listing.v1.MovieGroup.encode(message.groups[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                        return writer;
                    };
    
                    /**
                     * Encodes the specified GetListingResponse message, length delimited. Does not implicitly {@link movies.db.v1.GetListingResponse.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof movies.db.v1.GetListingResponse
                     * @static
                     * @param {movies.db.v1.IGetListingResponse} message GetListingResponse message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    GetListingResponse.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a GetListingResponse message from the specified reader or buffer.
                     * @function decode
                     * @memberof movies.db.v1.GetListingResponse
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {movies.db.v1.GetListingResponse} GetListingResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    GetListingResponse.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.movies.db.v1.GetListingResponse();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                if (!(message.groups && message.groups.length))
                                    message.groups = [];
                                message.groups.push($root.movies.listing.v1.MovieGroup.decode(reader, reader.uint32()));
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes a GetListingResponse message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof movies.db.v1.GetListingResponse
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {movies.db.v1.GetListingResponse} GetListingResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    GetListingResponse.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a GetListingResponse message.
                     * @function verify
                     * @memberof movies.db.v1.GetListingResponse
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    GetListingResponse.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.groups != null && message.hasOwnProperty("groups")) {
                            if (!Array.isArray(message.groups))
                                return "groups: array expected";
                            for (var i = 0; i < message.groups.length; ++i) {
                                var error = $root.movies.listing.v1.MovieGroup.verify(message.groups[i]);
                                if (error)
                                    return "groups." + error;
                            }
                        }
                        return null;
                    };
    
                    /**
                     * Creates a GetListingResponse message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof movies.db.v1.GetListingResponse
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {movies.db.v1.GetListingResponse} GetListingResponse
                     */
                    GetListingResponse.fromObject = function fromObject(object) {
                        if (object instanceof $root.movies.db.v1.GetListingResponse)
                            return object;
                        var message = new $root.movies.db.v1.GetListingResponse();
                        if (object.groups) {
                            if (!Array.isArray(object.groups))
                                throw TypeError(".movies.db.v1.GetListingResponse.groups: array expected");
                            message.groups = [];
                            for (var i = 0; i < object.groups.length; ++i) {
                                if (typeof object.groups[i] !== "object")
                                    throw TypeError(".movies.db.v1.GetListingResponse.groups: object expected");
                                message.groups[i] = $root.movies.listing.v1.MovieGroup.fromObject(object.groups[i]);
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a GetListingResponse message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof movies.db.v1.GetListingResponse
                     * @static
                     * @param {movies.db.v1.GetListingResponse} message GetListingResponse
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    GetListingResponse.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.arrays || options.defaults)
                            object.groups = [];
                        if (message.groups && message.groups.length) {
                            object.groups = [];
                            for (var j = 0; j < message.groups.length; ++j)
                                object.groups[j] = $root.movies.listing.v1.MovieGroup.toObject(message.groups[j], options);
                        }
                        return object;
                    };
    
                    /**
                     * Converts this GetListingResponse to JSON.
                     * @function toJSON
                     * @memberof movies.db.v1.GetListingResponse
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    GetListingResponse.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    return GetListingResponse;
                })();
    
                v1.GetMovieInfoRequest = (function() {
    
                    /**
                     * Properties of a GetMovieInfoRequest.
                     * @memberof movies.db.v1
                     * @interface IGetMovieInfoRequest
                     * @property {string|null} [key] GetMovieInfoRequest key
                     */
    
                    /**
                     * Constructs a new GetMovieInfoRequest.
                     * @memberof movies.db.v1
                     * @classdesc Represents a GetMovieInfoRequest.
                     * @implements IGetMovieInfoRequest
                     * @constructor
                     * @param {movies.db.v1.IGetMovieInfoRequest=} [properties] Properties to set
                     */
                    function GetMovieInfoRequest(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * GetMovieInfoRequest key.
                     * @member {string} key
                     * @memberof movies.db.v1.GetMovieInfoRequest
                     * @instance
                     */
                    GetMovieInfoRequest.prototype.key = "";
    
                    /**
                     * Creates a new GetMovieInfoRequest instance using the specified properties.
                     * @function create
                     * @memberof movies.db.v1.GetMovieInfoRequest
                     * @static
                     * @param {movies.db.v1.IGetMovieInfoRequest=} [properties] Properties to set
                     * @returns {movies.db.v1.GetMovieInfoRequest} GetMovieInfoRequest instance
                     */
                    GetMovieInfoRequest.create = function create(properties) {
                        return new GetMovieInfoRequest(properties);
                    };
    
                    /**
                     * Encodes the specified GetMovieInfoRequest message. Does not implicitly {@link movies.db.v1.GetMovieInfoRequest.verify|verify} messages.
                     * @function encode
                     * @memberof movies.db.v1.GetMovieInfoRequest
                     * @static
                     * @param {movies.db.v1.IGetMovieInfoRequest} message GetMovieInfoRequest message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    GetMovieInfoRequest.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                            writer.uint32(/* id 1, wireType 2 =*/10).string(message.key);
                        return writer;
                    };
    
                    /**
                     * Encodes the specified GetMovieInfoRequest message, length delimited. Does not implicitly {@link movies.db.v1.GetMovieInfoRequest.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof movies.db.v1.GetMovieInfoRequest
                     * @static
                     * @param {movies.db.v1.IGetMovieInfoRequest} message GetMovieInfoRequest message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    GetMovieInfoRequest.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a GetMovieInfoRequest message from the specified reader or buffer.
                     * @function decode
                     * @memberof movies.db.v1.GetMovieInfoRequest
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {movies.db.v1.GetMovieInfoRequest} GetMovieInfoRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    GetMovieInfoRequest.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.movies.db.v1.GetMovieInfoRequest();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.key = reader.string();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes a GetMovieInfoRequest message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof movies.db.v1.GetMovieInfoRequest
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {movies.db.v1.GetMovieInfoRequest} GetMovieInfoRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    GetMovieInfoRequest.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a GetMovieInfoRequest message.
                     * @function verify
                     * @memberof movies.db.v1.GetMovieInfoRequest
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    GetMovieInfoRequest.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.key != null && message.hasOwnProperty("key"))
                            if (!$util.isString(message.key))
                                return "key: string expected";
                        return null;
                    };
    
                    /**
                     * Creates a GetMovieInfoRequest message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof movies.db.v1.GetMovieInfoRequest
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {movies.db.v1.GetMovieInfoRequest} GetMovieInfoRequest
                     */
                    GetMovieInfoRequest.fromObject = function fromObject(object) {
                        if (object instanceof $root.movies.db.v1.GetMovieInfoRequest)
                            return object;
                        var message = new $root.movies.db.v1.GetMovieInfoRequest();
                        if (object.key != null)
                            message.key = String(object.key);
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a GetMovieInfoRequest message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof movies.db.v1.GetMovieInfoRequest
                     * @static
                     * @param {movies.db.v1.GetMovieInfoRequest} message GetMovieInfoRequest
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    GetMovieInfoRequest.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.defaults)
                            object.key = "";
                        if (message.key != null && message.hasOwnProperty("key"))
                            object.key = message.key;
                        return object;
                    };
    
                    /**
                     * Converts this GetMovieInfoRequest to JSON.
                     * @function toJSON
                     * @memberof movies.db.v1.GetMovieInfoRequest
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    GetMovieInfoRequest.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    return GetMovieInfoRequest;
                })();
    
                v1.GetMovieInfoResponse = (function() {
    
                    /**
                     * Properties of a GetMovieInfoResponse.
                     * @memberof movies.db.v1
                     * @interface IGetMovieInfoResponse
                     * @property {movies.info.v1.IMovieInfo|null} [info] GetMovieInfoResponse info
                     */
    
                    /**
                     * Constructs a new GetMovieInfoResponse.
                     * @memberof movies.db.v1
                     * @classdesc Represents a GetMovieInfoResponse.
                     * @implements IGetMovieInfoResponse
                     * @constructor
                     * @param {movies.db.v1.IGetMovieInfoResponse=} [properties] Properties to set
                     */
                    function GetMovieInfoResponse(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * GetMovieInfoResponse info.
                     * @member {movies.info.v1.IMovieInfo|null|undefined} info
                     * @memberof movies.db.v1.GetMovieInfoResponse
                     * @instance
                     */
                    GetMovieInfoResponse.prototype.info = null;
    
                    /**
                     * Creates a new GetMovieInfoResponse instance using the specified properties.
                     * @function create
                     * @memberof movies.db.v1.GetMovieInfoResponse
                     * @static
                     * @param {movies.db.v1.IGetMovieInfoResponse=} [properties] Properties to set
                     * @returns {movies.db.v1.GetMovieInfoResponse} GetMovieInfoResponse instance
                     */
                    GetMovieInfoResponse.create = function create(properties) {
                        return new GetMovieInfoResponse(properties);
                    };
    
                    /**
                     * Encodes the specified GetMovieInfoResponse message. Does not implicitly {@link movies.db.v1.GetMovieInfoResponse.verify|verify} messages.
                     * @function encode
                     * @memberof movies.db.v1.GetMovieInfoResponse
                     * @static
                     * @param {movies.db.v1.IGetMovieInfoResponse} message GetMovieInfoResponse message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    GetMovieInfoResponse.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.info != null && Object.hasOwnProperty.call(message, "info"))
                            $root.movies.info.v1.MovieInfo.encode(message.info, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                        return writer;
                    };
    
                    /**
                     * Encodes the specified GetMovieInfoResponse message, length delimited. Does not implicitly {@link movies.db.v1.GetMovieInfoResponse.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof movies.db.v1.GetMovieInfoResponse
                     * @static
                     * @param {movies.db.v1.IGetMovieInfoResponse} message GetMovieInfoResponse message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    GetMovieInfoResponse.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a GetMovieInfoResponse message from the specified reader or buffer.
                     * @function decode
                     * @memberof movies.db.v1.GetMovieInfoResponse
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {movies.db.v1.GetMovieInfoResponse} GetMovieInfoResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    GetMovieInfoResponse.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.movies.db.v1.GetMovieInfoResponse();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.info = $root.movies.info.v1.MovieInfo.decode(reader, reader.uint32());
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes a GetMovieInfoResponse message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof movies.db.v1.GetMovieInfoResponse
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {movies.db.v1.GetMovieInfoResponse} GetMovieInfoResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    GetMovieInfoResponse.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a GetMovieInfoResponse message.
                     * @function verify
                     * @memberof movies.db.v1.GetMovieInfoResponse
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    GetMovieInfoResponse.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.info != null && message.hasOwnProperty("info")) {
                            var error = $root.movies.info.v1.MovieInfo.verify(message.info);
                            if (error)
                                return "info." + error;
                        }
                        return null;
                    };
    
                    /**
                     * Creates a GetMovieInfoResponse message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof movies.db.v1.GetMovieInfoResponse
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {movies.db.v1.GetMovieInfoResponse} GetMovieInfoResponse
                     */
                    GetMovieInfoResponse.fromObject = function fromObject(object) {
                        if (object instanceof $root.movies.db.v1.GetMovieInfoResponse)
                            return object;
                        var message = new $root.movies.db.v1.GetMovieInfoResponse();
                        if (object.info != null) {
                            if (typeof object.info !== "object")
                                throw TypeError(".movies.db.v1.GetMovieInfoResponse.info: object expected");
                            message.info = $root.movies.info.v1.MovieInfo.fromObject(object.info);
                        }
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a GetMovieInfoResponse message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof movies.db.v1.GetMovieInfoResponse
                     * @static
                     * @param {movies.db.v1.GetMovieInfoResponse} message GetMovieInfoResponse
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    GetMovieInfoResponse.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.defaults)
                            object.info = null;
                        if (message.info != null && message.hasOwnProperty("info"))
                            object.info = $root.movies.info.v1.MovieInfo.toObject(message.info, options);
                        return object;
                    };
    
                    /**
                     * Converts this GetMovieInfoResponse to JSON.
                     * @function toJSON
                     * @memberof movies.db.v1.GetMovieInfoResponse
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    GetMovieInfoResponse.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    return GetMovieInfoResponse;
                })();
    
                v1.GetVideoFileRequest = (function() {
    
                    /**
                     * Properties of a GetVideoFileRequest.
                     * @memberof movies.db.v1
                     * @interface IGetVideoFileRequest
                     * @property {string|null} [key] GetVideoFileRequest key
                     */
    
                    /**
                     * Constructs a new GetVideoFileRequest.
                     * @memberof movies.db.v1
                     * @classdesc Represents a GetVideoFileRequest.
                     * @implements IGetVideoFileRequest
                     * @constructor
                     * @param {movies.db.v1.IGetVideoFileRequest=} [properties] Properties to set
                     */
                    function GetVideoFileRequest(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * GetVideoFileRequest key.
                     * @member {string} key
                     * @memberof movies.db.v1.GetVideoFileRequest
                     * @instance
                     */
                    GetVideoFileRequest.prototype.key = "";
    
                    /**
                     * Creates a new GetVideoFileRequest instance using the specified properties.
                     * @function create
                     * @memberof movies.db.v1.GetVideoFileRequest
                     * @static
                     * @param {movies.db.v1.IGetVideoFileRequest=} [properties] Properties to set
                     * @returns {movies.db.v1.GetVideoFileRequest} GetVideoFileRequest instance
                     */
                    GetVideoFileRequest.create = function create(properties) {
                        return new GetVideoFileRequest(properties);
                    };
    
                    /**
                     * Encodes the specified GetVideoFileRequest message. Does not implicitly {@link movies.db.v1.GetVideoFileRequest.verify|verify} messages.
                     * @function encode
                     * @memberof movies.db.v1.GetVideoFileRequest
                     * @static
                     * @param {movies.db.v1.IGetVideoFileRequest} message GetVideoFileRequest message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    GetVideoFileRequest.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                            writer.uint32(/* id 1, wireType 2 =*/10).string(message.key);
                        return writer;
                    };
    
                    /**
                     * Encodes the specified GetVideoFileRequest message, length delimited. Does not implicitly {@link movies.db.v1.GetVideoFileRequest.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof movies.db.v1.GetVideoFileRequest
                     * @static
                     * @param {movies.db.v1.IGetVideoFileRequest} message GetVideoFileRequest message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    GetVideoFileRequest.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a GetVideoFileRequest message from the specified reader or buffer.
                     * @function decode
                     * @memberof movies.db.v1.GetVideoFileRequest
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {movies.db.v1.GetVideoFileRequest} GetVideoFileRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    GetVideoFileRequest.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.movies.db.v1.GetVideoFileRequest();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.key = reader.string();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes a GetVideoFileRequest message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof movies.db.v1.GetVideoFileRequest
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {movies.db.v1.GetVideoFileRequest} GetVideoFileRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    GetVideoFileRequest.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a GetVideoFileRequest message.
                     * @function verify
                     * @memberof movies.db.v1.GetVideoFileRequest
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    GetVideoFileRequest.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.key != null && message.hasOwnProperty("key"))
                            if (!$util.isString(message.key))
                                return "key: string expected";
                        return null;
                    };
    
                    /**
                     * Creates a GetVideoFileRequest message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof movies.db.v1.GetVideoFileRequest
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {movies.db.v1.GetVideoFileRequest} GetVideoFileRequest
                     */
                    GetVideoFileRequest.fromObject = function fromObject(object) {
                        if (object instanceof $root.movies.db.v1.GetVideoFileRequest)
                            return object;
                        var message = new $root.movies.db.v1.GetVideoFileRequest();
                        if (object.key != null)
                            message.key = String(object.key);
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a GetVideoFileRequest message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof movies.db.v1.GetVideoFileRequest
                     * @static
                     * @param {movies.db.v1.GetVideoFileRequest} message GetVideoFileRequest
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    GetVideoFileRequest.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.defaults)
                            object.key = "";
                        if (message.key != null && message.hasOwnProperty("key"))
                            object.key = message.key;
                        return object;
                    };
    
                    /**
                     * Converts this GetVideoFileRequest to JSON.
                     * @function toJSON
                     * @memberof movies.db.v1.GetVideoFileRequest
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    GetVideoFileRequest.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    return GetVideoFileRequest;
                })();
    
                v1.GetVideoFileResponse = (function() {
    
                    /**
                     * Properties of a GetVideoFileResponse.
                     * @memberof movies.db.v1
                     * @interface IGetVideoFileResponse
                     * @property {string|null} [uri] GetVideoFileResponse uri
                     */
    
                    /**
                     * Constructs a new GetVideoFileResponse.
                     * @memberof movies.db.v1
                     * @classdesc Represents a GetVideoFileResponse.
                     * @implements IGetVideoFileResponse
                     * @constructor
                     * @param {movies.db.v1.IGetVideoFileResponse=} [properties] Properties to set
                     */
                    function GetVideoFileResponse(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * GetVideoFileResponse uri.
                     * @member {string|null|undefined} uri
                     * @memberof movies.db.v1.GetVideoFileResponse
                     * @instance
                     */
                    GetVideoFileResponse.prototype.uri = null;
    
                    // OneOf field names bound to virtual getters and setters
                    var $oneOfFields;
    
                    /**
                     * GetVideoFileResponse _uri.
                     * @member {"uri"|undefined} _uri
                     * @memberof movies.db.v1.GetVideoFileResponse
                     * @instance
                     */
                    Object.defineProperty(GetVideoFileResponse.prototype, "_uri", {
                        get: $util.oneOfGetter($oneOfFields = ["uri"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });
    
                    /**
                     * Creates a new GetVideoFileResponse instance using the specified properties.
                     * @function create
                     * @memberof movies.db.v1.GetVideoFileResponse
                     * @static
                     * @param {movies.db.v1.IGetVideoFileResponse=} [properties] Properties to set
                     * @returns {movies.db.v1.GetVideoFileResponse} GetVideoFileResponse instance
                     */
                    GetVideoFileResponse.create = function create(properties) {
                        return new GetVideoFileResponse(properties);
                    };
    
                    /**
                     * Encodes the specified GetVideoFileResponse message. Does not implicitly {@link movies.db.v1.GetVideoFileResponse.verify|verify} messages.
                     * @function encode
                     * @memberof movies.db.v1.GetVideoFileResponse
                     * @static
                     * @param {movies.db.v1.IGetVideoFileResponse} message GetVideoFileResponse message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    GetVideoFileResponse.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.uri != null && Object.hasOwnProperty.call(message, "uri"))
                            writer.uint32(/* id 1, wireType 2 =*/10).string(message.uri);
                        return writer;
                    };
    
                    /**
                     * Encodes the specified GetVideoFileResponse message, length delimited. Does not implicitly {@link movies.db.v1.GetVideoFileResponse.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof movies.db.v1.GetVideoFileResponse
                     * @static
                     * @param {movies.db.v1.IGetVideoFileResponse} message GetVideoFileResponse message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    GetVideoFileResponse.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a GetVideoFileResponse message from the specified reader or buffer.
                     * @function decode
                     * @memberof movies.db.v1.GetVideoFileResponse
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {movies.db.v1.GetVideoFileResponse} GetVideoFileResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    GetVideoFileResponse.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.movies.db.v1.GetVideoFileResponse();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.uri = reader.string();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes a GetVideoFileResponse message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof movies.db.v1.GetVideoFileResponse
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {movies.db.v1.GetVideoFileResponse} GetVideoFileResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    GetVideoFileResponse.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a GetVideoFileResponse message.
                     * @function verify
                     * @memberof movies.db.v1.GetVideoFileResponse
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    GetVideoFileResponse.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        var properties = {};
                        if (message.uri != null && message.hasOwnProperty("uri")) {
                            properties._uri = 1;
                            if (!$util.isString(message.uri))
                                return "uri: string expected";
                        }
                        return null;
                    };
    
                    /**
                     * Creates a GetVideoFileResponse message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof movies.db.v1.GetVideoFileResponse
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {movies.db.v1.GetVideoFileResponse} GetVideoFileResponse
                     */
                    GetVideoFileResponse.fromObject = function fromObject(object) {
                        if (object instanceof $root.movies.db.v1.GetVideoFileResponse)
                            return object;
                        var message = new $root.movies.db.v1.GetVideoFileResponse();
                        if (object.uri != null)
                            message.uri = String(object.uri);
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a GetVideoFileResponse message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof movies.db.v1.GetVideoFileResponse
                     * @static
                     * @param {movies.db.v1.GetVideoFileResponse} message GetVideoFileResponse
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    GetVideoFileResponse.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (message.uri != null && message.hasOwnProperty("uri")) {
                            object.uri = message.uri;
                            if (options.oneofs)
                                object._uri = "uri";
                        }
                        return object;
                    };
    
                    /**
                     * Converts this GetVideoFileResponse to JSON.
                     * @function toJSON
                     * @memberof movies.db.v1.GetVideoFileResponse
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    GetVideoFileResponse.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    return GetVideoFileResponse;
                })();
    
                v1.ListingResponseChangedEvent = (function() {
    
                    /**
                     * Properties of a ListingResponseChangedEvent.
                     * @memberof movies.db.v1
                     * @interface IListingResponseChangedEvent
                     * @property {Array.<movies.info.v1.IMovieGroup>|null} [removed] ListingResponseChangedEvent removed
                     * @property {Array.<movies.info.v1.IMovieGroup>|null} [added] ListingResponseChangedEvent added
                     * @property {Array.<movies.info.v1.IMovieGroup>|null} [changed] ListingResponseChangedEvent changed
                     */
    
                    /**
                     * Constructs a new ListingResponseChangedEvent.
                     * @memberof movies.db.v1
                     * @classdesc Represents a ListingResponseChangedEvent.
                     * @implements IListingResponseChangedEvent
                     * @constructor
                     * @param {movies.db.v1.IListingResponseChangedEvent=} [properties] Properties to set
                     */
                    function ListingResponseChangedEvent(properties) {
                        this.removed = [];
                        this.added = [];
                        this.changed = [];
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * ListingResponseChangedEvent removed.
                     * @member {Array.<movies.info.v1.IMovieGroup>} removed
                     * @memberof movies.db.v1.ListingResponseChangedEvent
                     * @instance
                     */
                    ListingResponseChangedEvent.prototype.removed = $util.emptyArray;
    
                    /**
                     * ListingResponseChangedEvent added.
                     * @member {Array.<movies.info.v1.IMovieGroup>} added
                     * @memberof movies.db.v1.ListingResponseChangedEvent
                     * @instance
                     */
                    ListingResponseChangedEvent.prototype.added = $util.emptyArray;
    
                    /**
                     * ListingResponseChangedEvent changed.
                     * @member {Array.<movies.info.v1.IMovieGroup>} changed
                     * @memberof movies.db.v1.ListingResponseChangedEvent
                     * @instance
                     */
                    ListingResponseChangedEvent.prototype.changed = $util.emptyArray;
    
                    /**
                     * Creates a new ListingResponseChangedEvent instance using the specified properties.
                     * @function create
                     * @memberof movies.db.v1.ListingResponseChangedEvent
                     * @static
                     * @param {movies.db.v1.IListingResponseChangedEvent=} [properties] Properties to set
                     * @returns {movies.db.v1.ListingResponseChangedEvent} ListingResponseChangedEvent instance
                     */
                    ListingResponseChangedEvent.create = function create(properties) {
                        return new ListingResponseChangedEvent(properties);
                    };
    
                    /**
                     * Encodes the specified ListingResponseChangedEvent message. Does not implicitly {@link movies.db.v1.ListingResponseChangedEvent.verify|verify} messages.
                     * @function encode
                     * @memberof movies.db.v1.ListingResponseChangedEvent
                     * @static
                     * @param {movies.db.v1.IListingResponseChangedEvent} message ListingResponseChangedEvent message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ListingResponseChangedEvent.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.removed != null && message.removed.length)
                            for (var i = 0; i < message.removed.length; ++i)
                                $root.movies.info.v1.MovieGroup.encode(message.removed[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                        if (message.added != null && message.added.length)
                            for (var i = 0; i < message.added.length; ++i)
                                $root.movies.info.v1.MovieGroup.encode(message.added[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                        if (message.changed != null && message.changed.length)
                            for (var i = 0; i < message.changed.length; ++i)
                                $root.movies.info.v1.MovieGroup.encode(message.changed[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                        return writer;
                    };
    
                    /**
                     * Encodes the specified ListingResponseChangedEvent message, length delimited. Does not implicitly {@link movies.db.v1.ListingResponseChangedEvent.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof movies.db.v1.ListingResponseChangedEvent
                     * @static
                     * @param {movies.db.v1.IListingResponseChangedEvent} message ListingResponseChangedEvent message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ListingResponseChangedEvent.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a ListingResponseChangedEvent message from the specified reader or buffer.
                     * @function decode
                     * @memberof movies.db.v1.ListingResponseChangedEvent
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {movies.db.v1.ListingResponseChangedEvent} ListingResponseChangedEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ListingResponseChangedEvent.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.movies.db.v1.ListingResponseChangedEvent();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                if (!(message.removed && message.removed.length))
                                    message.removed = [];
                                message.removed.push($root.movies.info.v1.MovieGroup.decode(reader, reader.uint32()));
                                break;
                            case 2:
                                if (!(message.added && message.added.length))
                                    message.added = [];
                                message.added.push($root.movies.info.v1.MovieGroup.decode(reader, reader.uint32()));
                                break;
                            case 3:
                                if (!(message.changed && message.changed.length))
                                    message.changed = [];
                                message.changed.push($root.movies.info.v1.MovieGroup.decode(reader, reader.uint32()));
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes a ListingResponseChangedEvent message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof movies.db.v1.ListingResponseChangedEvent
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {movies.db.v1.ListingResponseChangedEvent} ListingResponseChangedEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ListingResponseChangedEvent.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a ListingResponseChangedEvent message.
                     * @function verify
                     * @memberof movies.db.v1.ListingResponseChangedEvent
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    ListingResponseChangedEvent.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.removed != null && message.hasOwnProperty("removed")) {
                            if (!Array.isArray(message.removed))
                                return "removed: array expected";
                            for (var i = 0; i < message.removed.length; ++i) {
                                var error = $root.movies.info.v1.MovieGroup.verify(message.removed[i]);
                                if (error)
                                    return "removed." + error;
                            }
                        }
                        if (message.added != null && message.hasOwnProperty("added")) {
                            if (!Array.isArray(message.added))
                                return "added: array expected";
                            for (var i = 0; i < message.added.length; ++i) {
                                var error = $root.movies.info.v1.MovieGroup.verify(message.added[i]);
                                if (error)
                                    return "added." + error;
                            }
                        }
                        if (message.changed != null && message.hasOwnProperty("changed")) {
                            if (!Array.isArray(message.changed))
                                return "changed: array expected";
                            for (var i = 0; i < message.changed.length; ++i) {
                                var error = $root.movies.info.v1.MovieGroup.verify(message.changed[i]);
                                if (error)
                                    return "changed." + error;
                            }
                        }
                        return null;
                    };
    
                    /**
                     * Creates a ListingResponseChangedEvent message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof movies.db.v1.ListingResponseChangedEvent
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {movies.db.v1.ListingResponseChangedEvent} ListingResponseChangedEvent
                     */
                    ListingResponseChangedEvent.fromObject = function fromObject(object) {
                        if (object instanceof $root.movies.db.v1.ListingResponseChangedEvent)
                            return object;
                        var message = new $root.movies.db.v1.ListingResponseChangedEvent();
                        if (object.removed) {
                            if (!Array.isArray(object.removed))
                                throw TypeError(".movies.db.v1.ListingResponseChangedEvent.removed: array expected");
                            message.removed = [];
                            for (var i = 0; i < object.removed.length; ++i) {
                                if (typeof object.removed[i] !== "object")
                                    throw TypeError(".movies.db.v1.ListingResponseChangedEvent.removed: object expected");
                                message.removed[i] = $root.movies.info.v1.MovieGroup.fromObject(object.removed[i]);
                            }
                        }
                        if (object.added) {
                            if (!Array.isArray(object.added))
                                throw TypeError(".movies.db.v1.ListingResponseChangedEvent.added: array expected");
                            message.added = [];
                            for (var i = 0; i < object.added.length; ++i) {
                                if (typeof object.added[i] !== "object")
                                    throw TypeError(".movies.db.v1.ListingResponseChangedEvent.added: object expected");
                                message.added[i] = $root.movies.info.v1.MovieGroup.fromObject(object.added[i]);
                            }
                        }
                        if (object.changed) {
                            if (!Array.isArray(object.changed))
                                throw TypeError(".movies.db.v1.ListingResponseChangedEvent.changed: array expected");
                            message.changed = [];
                            for (var i = 0; i < object.changed.length; ++i) {
                                if (typeof object.changed[i] !== "object")
                                    throw TypeError(".movies.db.v1.ListingResponseChangedEvent.changed: object expected");
                                message.changed[i] = $root.movies.info.v1.MovieGroup.fromObject(object.changed[i]);
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a ListingResponseChangedEvent message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof movies.db.v1.ListingResponseChangedEvent
                     * @static
                     * @param {movies.db.v1.ListingResponseChangedEvent} message ListingResponseChangedEvent
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    ListingResponseChangedEvent.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.arrays || options.defaults) {
                            object.removed = [];
                            object.added = [];
                            object.changed = [];
                        }
                        if (message.removed && message.removed.length) {
                            object.removed = [];
                            for (var j = 0; j < message.removed.length; ++j)
                                object.removed[j] = $root.movies.info.v1.MovieGroup.toObject(message.removed[j], options);
                        }
                        if (message.added && message.added.length) {
                            object.added = [];
                            for (var j = 0; j < message.added.length; ++j)
                                object.added[j] = $root.movies.info.v1.MovieGroup.toObject(message.added[j], options);
                        }
                        if (message.changed && message.changed.length) {
                            object.changed = [];
                            for (var j = 0; j < message.changed.length; ++j)
                                object.changed[j] = $root.movies.info.v1.MovieGroup.toObject(message.changed[j], options);
                        }
                        return object;
                    };
    
                    /**
                     * Converts this ListingResponseChangedEvent to JSON.
                     * @function toJSON
                     * @memberof movies.db.v1.ListingResponseChangedEvent
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    ListingResponseChangedEvent.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    return ListingResponseChangedEvent;
                })();
    
                v1.MovieInfoChangedEvent = (function() {
    
                    /**
                     * Properties of a MovieInfoChangedEvent.
                     * @memberof movies.db.v1
                     * @interface IMovieInfoChangedEvent
                     * @property {movies.info.v1.IMovieInfo|null} [info] MovieInfoChangedEvent info
                     */
    
                    /**
                     * Constructs a new MovieInfoChangedEvent.
                     * @memberof movies.db.v1
                     * @classdesc Represents a MovieInfoChangedEvent.
                     * @implements IMovieInfoChangedEvent
                     * @constructor
                     * @param {movies.db.v1.IMovieInfoChangedEvent=} [properties] Properties to set
                     */
                    function MovieInfoChangedEvent(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * MovieInfoChangedEvent info.
                     * @member {movies.info.v1.IMovieInfo|null|undefined} info
                     * @memberof movies.db.v1.MovieInfoChangedEvent
                     * @instance
                     */
                    MovieInfoChangedEvent.prototype.info = null;
    
                    /**
                     * Creates a new MovieInfoChangedEvent instance using the specified properties.
                     * @function create
                     * @memberof movies.db.v1.MovieInfoChangedEvent
                     * @static
                     * @param {movies.db.v1.IMovieInfoChangedEvent=} [properties] Properties to set
                     * @returns {movies.db.v1.MovieInfoChangedEvent} MovieInfoChangedEvent instance
                     */
                    MovieInfoChangedEvent.create = function create(properties) {
                        return new MovieInfoChangedEvent(properties);
                    };
    
                    /**
                     * Encodes the specified MovieInfoChangedEvent message. Does not implicitly {@link movies.db.v1.MovieInfoChangedEvent.verify|verify} messages.
                     * @function encode
                     * @memberof movies.db.v1.MovieInfoChangedEvent
                     * @static
                     * @param {movies.db.v1.IMovieInfoChangedEvent} message MovieInfoChangedEvent message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    MovieInfoChangedEvent.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.info != null && Object.hasOwnProperty.call(message, "info"))
                            $root.movies.info.v1.MovieInfo.encode(message.info, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                        return writer;
                    };
    
                    /**
                     * Encodes the specified MovieInfoChangedEvent message, length delimited. Does not implicitly {@link movies.db.v1.MovieInfoChangedEvent.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof movies.db.v1.MovieInfoChangedEvent
                     * @static
                     * @param {movies.db.v1.IMovieInfoChangedEvent} message MovieInfoChangedEvent message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    MovieInfoChangedEvent.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a MovieInfoChangedEvent message from the specified reader or buffer.
                     * @function decode
                     * @memberof movies.db.v1.MovieInfoChangedEvent
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {movies.db.v1.MovieInfoChangedEvent} MovieInfoChangedEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    MovieInfoChangedEvent.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.movies.db.v1.MovieInfoChangedEvent();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.info = $root.movies.info.v1.MovieInfo.decode(reader, reader.uint32());
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes a MovieInfoChangedEvent message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof movies.db.v1.MovieInfoChangedEvent
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {movies.db.v1.MovieInfoChangedEvent} MovieInfoChangedEvent
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    MovieInfoChangedEvent.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a MovieInfoChangedEvent message.
                     * @function verify
                     * @memberof movies.db.v1.MovieInfoChangedEvent
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    MovieInfoChangedEvent.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.info != null && message.hasOwnProperty("info")) {
                            var error = $root.movies.info.v1.MovieInfo.verify(message.info);
                            if (error)
                                return "info." + error;
                        }
                        return null;
                    };
    
                    /**
                     * Creates a MovieInfoChangedEvent message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof movies.db.v1.MovieInfoChangedEvent
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {movies.db.v1.MovieInfoChangedEvent} MovieInfoChangedEvent
                     */
                    MovieInfoChangedEvent.fromObject = function fromObject(object) {
                        if (object instanceof $root.movies.db.v1.MovieInfoChangedEvent)
                            return object;
                        var message = new $root.movies.db.v1.MovieInfoChangedEvent();
                        if (object.info != null) {
                            if (typeof object.info !== "object")
                                throw TypeError(".movies.db.v1.MovieInfoChangedEvent.info: object expected");
                            message.info = $root.movies.info.v1.MovieInfo.fromObject(object.info);
                        }
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a MovieInfoChangedEvent message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof movies.db.v1.MovieInfoChangedEvent
                     * @static
                     * @param {movies.db.v1.MovieInfoChangedEvent} message MovieInfoChangedEvent
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    MovieInfoChangedEvent.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.defaults)
                            object.info = null;
                        if (message.info != null && message.hasOwnProperty("info"))
                            object.info = $root.movies.info.v1.MovieInfo.toObject(message.info, options);
                        return object;
                    };
    
                    /**
                     * Converts this MovieInfoChangedEvent to JSON.
                     * @function toJSON
                     * @memberof movies.db.v1.MovieInfoChangedEvent
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    MovieInfoChangedEvent.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    return MovieInfoChangedEvent;
                })();
    
                return v1;
            })();
    
            return db;
        })();
    
        movies.filters = (function() {
    
            /**
             * Namespace filters.
             * @memberof movies
             * @namespace
             */
            var filters = {};
    
            filters.v1 = (function() {
    
                /**
                 * Namespace v1.
                 * @memberof movies.filters
                 * @namespace
                 */
                var v1 = {};
    
                v1.RangeFilter = (function() {
    
                    /**
                     * Properties of a RangeFilter.
                     * @memberof movies.filters.v1
                     * @interface IRangeFilter
                     * @property {string|null} [field] RangeFilter field
                     * @property {number|null} [low] RangeFilter low
                     * @property {number|null} [high] RangeFilter high
                     * @property {boolean|null} [includeMissing] RangeFilter includeMissing
                     */
    
                    /**
                     * Constructs a new RangeFilter.
                     * @memberof movies.filters.v1
                     * @classdesc Represents a RangeFilter.
                     * @implements IRangeFilter
                     * @constructor
                     * @param {movies.filters.v1.IRangeFilter=} [properties] Properties to set
                     */
                    function RangeFilter(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * RangeFilter field.
                     * @member {string} field
                     * @memberof movies.filters.v1.RangeFilter
                     * @instance
                     */
                    RangeFilter.prototype.field = "";
    
                    /**
                     * RangeFilter low.
                     * @member {number} low
                     * @memberof movies.filters.v1.RangeFilter
                     * @instance
                     */
                    RangeFilter.prototype.low = 0;
    
                    /**
                     * RangeFilter high.
                     * @member {number} high
                     * @memberof movies.filters.v1.RangeFilter
                     * @instance
                     */
                    RangeFilter.prototype.high = 0;
    
                    /**
                     * RangeFilter includeMissing.
                     * @member {boolean} includeMissing
                     * @memberof movies.filters.v1.RangeFilter
                     * @instance
                     */
                    RangeFilter.prototype.includeMissing = false;
    
                    /**
                     * Creates a new RangeFilter instance using the specified properties.
                     * @function create
                     * @memberof movies.filters.v1.RangeFilter
                     * @static
                     * @param {movies.filters.v1.IRangeFilter=} [properties] Properties to set
                     * @returns {movies.filters.v1.RangeFilter} RangeFilter instance
                     */
                    RangeFilter.create = function create(properties) {
                        return new RangeFilter(properties);
                    };
    
                    /**
                     * Encodes the specified RangeFilter message. Does not implicitly {@link movies.filters.v1.RangeFilter.verify|verify} messages.
                     * @function encode
                     * @memberof movies.filters.v1.RangeFilter
                     * @static
                     * @param {movies.filters.v1.IRangeFilter} message RangeFilter message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    RangeFilter.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.field != null && Object.hasOwnProperty.call(message, "field"))
                            writer.uint32(/* id 1, wireType 2 =*/10).string(message.field);
                        if (message.low != null && Object.hasOwnProperty.call(message, "low"))
                            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.low);
                        if (message.high != null && Object.hasOwnProperty.call(message, "high"))
                            writer.uint32(/* id 3, wireType 0 =*/24).int32(message.high);
                        if (message.includeMissing != null && Object.hasOwnProperty.call(message, "includeMissing"))
                            writer.uint32(/* id 4, wireType 0 =*/32).bool(message.includeMissing);
                        return writer;
                    };
    
                    /**
                     * Encodes the specified RangeFilter message, length delimited. Does not implicitly {@link movies.filters.v1.RangeFilter.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof movies.filters.v1.RangeFilter
                     * @static
                     * @param {movies.filters.v1.IRangeFilter} message RangeFilter message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    RangeFilter.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a RangeFilter message from the specified reader or buffer.
                     * @function decode
                     * @memberof movies.filters.v1.RangeFilter
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {movies.filters.v1.RangeFilter} RangeFilter
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    RangeFilter.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.movies.filters.v1.RangeFilter();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.field = reader.string();
                                break;
                            case 2:
                                message.low = reader.int32();
                                break;
                            case 3:
                                message.high = reader.int32();
                                break;
                            case 4:
                                message.includeMissing = reader.bool();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes a RangeFilter message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof movies.filters.v1.RangeFilter
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {movies.filters.v1.RangeFilter} RangeFilter
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    RangeFilter.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a RangeFilter message.
                     * @function verify
                     * @memberof movies.filters.v1.RangeFilter
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    RangeFilter.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.field != null && message.hasOwnProperty("field"))
                            if (!$util.isString(message.field))
                                return "field: string expected";
                        if (message.low != null && message.hasOwnProperty("low"))
                            if (!$util.isInteger(message.low))
                                return "low: integer expected";
                        if (message.high != null && message.hasOwnProperty("high"))
                            if (!$util.isInteger(message.high))
                                return "high: integer expected";
                        if (message.includeMissing != null && message.hasOwnProperty("includeMissing"))
                            if (typeof message.includeMissing !== "boolean")
                                return "includeMissing: boolean expected";
                        return null;
                    };
    
                    /**
                     * Creates a RangeFilter message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof movies.filters.v1.RangeFilter
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {movies.filters.v1.RangeFilter} RangeFilter
                     */
                    RangeFilter.fromObject = function fromObject(object) {
                        if (object instanceof $root.movies.filters.v1.RangeFilter)
                            return object;
                        var message = new $root.movies.filters.v1.RangeFilter();
                        if (object.field != null)
                            message.field = String(object.field);
                        if (object.low != null)
                            message.low = object.low | 0;
                        if (object.high != null)
                            message.high = object.high | 0;
                        if (object.includeMissing != null)
                            message.includeMissing = Boolean(object.includeMissing);
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a RangeFilter message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof movies.filters.v1.RangeFilter
                     * @static
                     * @param {movies.filters.v1.RangeFilter} message RangeFilter
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    RangeFilter.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.defaults) {
                            object.field = "";
                            object.low = 0;
                            object.high = 0;
                            object.includeMissing = false;
                        }
                        if (message.field != null && message.hasOwnProperty("field"))
                            object.field = message.field;
                        if (message.low != null && message.hasOwnProperty("low"))
                            object.low = message.low;
                        if (message.high != null && message.hasOwnProperty("high"))
                            object.high = message.high;
                        if (message.includeMissing != null && message.hasOwnProperty("includeMissing"))
                            object.includeMissing = message.includeMissing;
                        return object;
                    };
    
                    /**
                     * Converts this RangeFilter to JSON.
                     * @function toJSON
                     * @memberof movies.filters.v1.RangeFilter
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    RangeFilter.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    return RangeFilter;
                })();
    
                v1.TokensFilter = (function() {
    
                    /**
                     * Properties of a TokensFilter.
                     * @memberof movies.filters.v1
                     * @interface ITokensFilter
                     * @property {string|null} [field] TokensFilter field
                     * @property {Array.<string>|null} [token] TokensFilter token
                     * @property {boolean|null} [includeMissing] TokensFilter includeMissing
                     */
    
                    /**
                     * Constructs a new TokensFilter.
                     * @memberof movies.filters.v1
                     * @classdesc Represents a TokensFilter.
                     * @implements ITokensFilter
                     * @constructor
                     * @param {movies.filters.v1.ITokensFilter=} [properties] Properties to set
                     */
                    function TokensFilter(properties) {
                        this.token = [];
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * TokensFilter field.
                     * @member {string} field
                     * @memberof movies.filters.v1.TokensFilter
                     * @instance
                     */
                    TokensFilter.prototype.field = "";
    
                    /**
                     * TokensFilter token.
                     * @member {Array.<string>} token
                     * @memberof movies.filters.v1.TokensFilter
                     * @instance
                     */
                    TokensFilter.prototype.token = $util.emptyArray;
    
                    /**
                     * TokensFilter includeMissing.
                     * @member {boolean} includeMissing
                     * @memberof movies.filters.v1.TokensFilter
                     * @instance
                     */
                    TokensFilter.prototype.includeMissing = false;
    
                    /**
                     * Creates a new TokensFilter instance using the specified properties.
                     * @function create
                     * @memberof movies.filters.v1.TokensFilter
                     * @static
                     * @param {movies.filters.v1.ITokensFilter=} [properties] Properties to set
                     * @returns {movies.filters.v1.TokensFilter} TokensFilter instance
                     */
                    TokensFilter.create = function create(properties) {
                        return new TokensFilter(properties);
                    };
    
                    /**
                     * Encodes the specified TokensFilter message. Does not implicitly {@link movies.filters.v1.TokensFilter.verify|verify} messages.
                     * @function encode
                     * @memberof movies.filters.v1.TokensFilter
                     * @static
                     * @param {movies.filters.v1.ITokensFilter} message TokensFilter message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    TokensFilter.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.field != null && Object.hasOwnProperty.call(message, "field"))
                            writer.uint32(/* id 1, wireType 2 =*/10).string(message.field);
                        if (message.token != null && message.token.length)
                            for (var i = 0; i < message.token.length; ++i)
                                writer.uint32(/* id 2, wireType 2 =*/18).string(message.token[i]);
                        if (message.includeMissing != null && Object.hasOwnProperty.call(message, "includeMissing"))
                            writer.uint32(/* id 4, wireType 0 =*/32).bool(message.includeMissing);
                        return writer;
                    };
    
                    /**
                     * Encodes the specified TokensFilter message, length delimited. Does not implicitly {@link movies.filters.v1.TokensFilter.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof movies.filters.v1.TokensFilter
                     * @static
                     * @param {movies.filters.v1.ITokensFilter} message TokensFilter message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    TokensFilter.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a TokensFilter message from the specified reader or buffer.
                     * @function decode
                     * @memberof movies.filters.v1.TokensFilter
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {movies.filters.v1.TokensFilter} TokensFilter
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    TokensFilter.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.movies.filters.v1.TokensFilter();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.field = reader.string();
                                break;
                            case 2:
                                if (!(message.token && message.token.length))
                                    message.token = [];
                                message.token.push(reader.string());
                                break;
                            case 4:
                                message.includeMissing = reader.bool();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes a TokensFilter message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof movies.filters.v1.TokensFilter
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {movies.filters.v1.TokensFilter} TokensFilter
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    TokensFilter.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a TokensFilter message.
                     * @function verify
                     * @memberof movies.filters.v1.TokensFilter
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    TokensFilter.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.field != null && message.hasOwnProperty("field"))
                            if (!$util.isString(message.field))
                                return "field: string expected";
                        if (message.token != null && message.hasOwnProperty("token")) {
                            if (!Array.isArray(message.token))
                                return "token: array expected";
                            for (var i = 0; i < message.token.length; ++i)
                                if (!$util.isString(message.token[i]))
                                    return "token: string[] expected";
                        }
                        if (message.includeMissing != null && message.hasOwnProperty("includeMissing"))
                            if (typeof message.includeMissing !== "boolean")
                                return "includeMissing: boolean expected";
                        return null;
                    };
    
                    /**
                     * Creates a TokensFilter message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof movies.filters.v1.TokensFilter
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {movies.filters.v1.TokensFilter} TokensFilter
                     */
                    TokensFilter.fromObject = function fromObject(object) {
                        if (object instanceof $root.movies.filters.v1.TokensFilter)
                            return object;
                        var message = new $root.movies.filters.v1.TokensFilter();
                        if (object.field != null)
                            message.field = String(object.field);
                        if (object.token) {
                            if (!Array.isArray(object.token))
                                throw TypeError(".movies.filters.v1.TokensFilter.token: array expected");
                            message.token = [];
                            for (var i = 0; i < object.token.length; ++i)
                                message.token[i] = String(object.token[i]);
                        }
                        if (object.includeMissing != null)
                            message.includeMissing = Boolean(object.includeMissing);
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a TokensFilter message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof movies.filters.v1.TokensFilter
                     * @static
                     * @param {movies.filters.v1.TokensFilter} message TokensFilter
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    TokensFilter.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.arrays || options.defaults)
                            object.token = [];
                        if (options.defaults) {
                            object.field = "";
                            object.includeMissing = false;
                        }
                        if (message.field != null && message.hasOwnProperty("field"))
                            object.field = message.field;
                        if (message.token && message.token.length) {
                            object.token = [];
                            for (var j = 0; j < message.token.length; ++j)
                                object.token[j] = message.token[j];
                        }
                        if (message.includeMissing != null && message.hasOwnProperty("includeMissing"))
                            object.includeMissing = message.includeMissing;
                        return object;
                    };
    
                    /**
                     * Converts this TokensFilter to JSON.
                     * @function toJSON
                     * @memberof movies.filters.v1.TokensFilter
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    TokensFilter.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    return TokensFilter;
                })();
    
                v1.OnOffFilter = (function() {
    
                    /**
                     * Properties of an OnOffFilter.
                     * @memberof movies.filters.v1
                     * @interface IOnOffFilter
                     * @property {string|null} [field] OnOffFilter field
                     * @property {boolean|null} [on] OnOffFilter on
                     */
    
                    /**
                     * Constructs a new OnOffFilter.
                     * @memberof movies.filters.v1
                     * @classdesc Represents an OnOffFilter.
                     * @implements IOnOffFilter
                     * @constructor
                     * @param {movies.filters.v1.IOnOffFilter=} [properties] Properties to set
                     */
                    function OnOffFilter(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * OnOffFilter field.
                     * @member {string} field
                     * @memberof movies.filters.v1.OnOffFilter
                     * @instance
                     */
                    OnOffFilter.prototype.field = "";
    
                    /**
                     * OnOffFilter on.
                     * @member {boolean} on
                     * @memberof movies.filters.v1.OnOffFilter
                     * @instance
                     */
                    OnOffFilter.prototype.on = false;
    
                    /**
                     * Creates a new OnOffFilter instance using the specified properties.
                     * @function create
                     * @memberof movies.filters.v1.OnOffFilter
                     * @static
                     * @param {movies.filters.v1.IOnOffFilter=} [properties] Properties to set
                     * @returns {movies.filters.v1.OnOffFilter} OnOffFilter instance
                     */
                    OnOffFilter.create = function create(properties) {
                        return new OnOffFilter(properties);
                    };
    
                    /**
                     * Encodes the specified OnOffFilter message. Does not implicitly {@link movies.filters.v1.OnOffFilter.verify|verify} messages.
                     * @function encode
                     * @memberof movies.filters.v1.OnOffFilter
                     * @static
                     * @param {movies.filters.v1.IOnOffFilter} message OnOffFilter message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    OnOffFilter.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.field != null && Object.hasOwnProperty.call(message, "field"))
                            writer.uint32(/* id 1, wireType 2 =*/10).string(message.field);
                        if (message.on != null && Object.hasOwnProperty.call(message, "on"))
                            writer.uint32(/* id 2, wireType 0 =*/16).bool(message.on);
                        return writer;
                    };
    
                    /**
                     * Encodes the specified OnOffFilter message, length delimited. Does not implicitly {@link movies.filters.v1.OnOffFilter.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof movies.filters.v1.OnOffFilter
                     * @static
                     * @param {movies.filters.v1.IOnOffFilter} message OnOffFilter message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    OnOffFilter.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes an OnOffFilter message from the specified reader or buffer.
                     * @function decode
                     * @memberof movies.filters.v1.OnOffFilter
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {movies.filters.v1.OnOffFilter} OnOffFilter
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    OnOffFilter.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.movies.filters.v1.OnOffFilter();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.field = reader.string();
                                break;
                            case 2:
                                message.on = reader.bool();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes an OnOffFilter message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof movies.filters.v1.OnOffFilter
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {movies.filters.v1.OnOffFilter} OnOffFilter
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    OnOffFilter.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies an OnOffFilter message.
                     * @function verify
                     * @memberof movies.filters.v1.OnOffFilter
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    OnOffFilter.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.field != null && message.hasOwnProperty("field"))
                            if (!$util.isString(message.field))
                                return "field: string expected";
                        if (message.on != null && message.hasOwnProperty("on"))
                            if (typeof message.on !== "boolean")
                                return "on: boolean expected";
                        return null;
                    };
    
                    /**
                     * Creates an OnOffFilter message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof movies.filters.v1.OnOffFilter
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {movies.filters.v1.OnOffFilter} OnOffFilter
                     */
                    OnOffFilter.fromObject = function fromObject(object) {
                        if (object instanceof $root.movies.filters.v1.OnOffFilter)
                            return object;
                        var message = new $root.movies.filters.v1.OnOffFilter();
                        if (object.field != null)
                            message.field = String(object.field);
                        if (object.on != null)
                            message.on = Boolean(object.on);
                        return message;
                    };
    
                    /**
                     * Creates a plain object from an OnOffFilter message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof movies.filters.v1.OnOffFilter
                     * @static
                     * @param {movies.filters.v1.OnOffFilter} message OnOffFilter
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    OnOffFilter.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.defaults) {
                            object.field = "";
                            object.on = false;
                        }
                        if (message.field != null && message.hasOwnProperty("field"))
                            object.field = message.field;
                        if (message.on != null && message.hasOwnProperty("on"))
                            object.on = message.on;
                        return object;
                    };
    
                    /**
                     * Converts this OnOffFilter to JSON.
                     * @function toJSON
                     * @memberof movies.filters.v1.OnOffFilter
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    OnOffFilter.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    return OnOffFilter;
                })();
    
                v1.Filter = (function() {
    
                    /**
                     * Properties of a Filter.
                     * @memberof movies.filters.v1
                     * @interface IFilter
                     * @property {movies.filters.v1.IRangeFilter|null} [range] Filter range
                     * @property {movies.filters.v1.ITokensFilter|null} [tokens] Filter tokens
                     * @property {movies.filters.v1.IOnOffFilter|null} [onOff] Filter onOff
                     */
    
                    /**
                     * Constructs a new Filter.
                     * @memberof movies.filters.v1
                     * @classdesc Represents a Filter.
                     * @implements IFilter
                     * @constructor
                     * @param {movies.filters.v1.IFilter=} [properties] Properties to set
                     */
                    function Filter(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * Filter range.
                     * @member {movies.filters.v1.IRangeFilter|null|undefined} range
                     * @memberof movies.filters.v1.Filter
                     * @instance
                     */
                    Filter.prototype.range = null;
    
                    /**
                     * Filter tokens.
                     * @member {movies.filters.v1.ITokensFilter|null|undefined} tokens
                     * @memberof movies.filters.v1.Filter
                     * @instance
                     */
                    Filter.prototype.tokens = null;
    
                    /**
                     * Filter onOff.
                     * @member {movies.filters.v1.IOnOffFilter|null|undefined} onOff
                     * @memberof movies.filters.v1.Filter
                     * @instance
                     */
                    Filter.prototype.onOff = null;
    
                    // OneOf field names bound to virtual getters and setters
                    var $oneOfFields;
    
                    /**
                     * Filter kind.
                     * @member {"range"|"tokens"|"onOff"|undefined} kind
                     * @memberof movies.filters.v1.Filter
                     * @instance
                     */
                    Object.defineProperty(Filter.prototype, "kind", {
                        get: $util.oneOfGetter($oneOfFields = ["range", "tokens", "onOff"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });
    
                    /**
                     * Creates a new Filter instance using the specified properties.
                     * @function create
                     * @memberof movies.filters.v1.Filter
                     * @static
                     * @param {movies.filters.v1.IFilter=} [properties] Properties to set
                     * @returns {movies.filters.v1.Filter} Filter instance
                     */
                    Filter.create = function create(properties) {
                        return new Filter(properties);
                    };
    
                    /**
                     * Encodes the specified Filter message. Does not implicitly {@link movies.filters.v1.Filter.verify|verify} messages.
                     * @function encode
                     * @memberof movies.filters.v1.Filter
                     * @static
                     * @param {movies.filters.v1.IFilter} message Filter message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Filter.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.range != null && Object.hasOwnProperty.call(message, "range"))
                            $root.movies.filters.v1.RangeFilter.encode(message.range, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                        if (message.tokens != null && Object.hasOwnProperty.call(message, "tokens"))
                            $root.movies.filters.v1.TokensFilter.encode(message.tokens, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                        if (message.onOff != null && Object.hasOwnProperty.call(message, "onOff"))
                            $root.movies.filters.v1.OnOffFilter.encode(message.onOff, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                        return writer;
                    };
    
                    /**
                     * Encodes the specified Filter message, length delimited. Does not implicitly {@link movies.filters.v1.Filter.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof movies.filters.v1.Filter
                     * @static
                     * @param {movies.filters.v1.IFilter} message Filter message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Filter.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a Filter message from the specified reader or buffer.
                     * @function decode
                     * @memberof movies.filters.v1.Filter
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {movies.filters.v1.Filter} Filter
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Filter.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.movies.filters.v1.Filter();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.range = $root.movies.filters.v1.RangeFilter.decode(reader, reader.uint32());
                                break;
                            case 2:
                                message.tokens = $root.movies.filters.v1.TokensFilter.decode(reader, reader.uint32());
                                break;
                            case 3:
                                message.onOff = $root.movies.filters.v1.OnOffFilter.decode(reader, reader.uint32());
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes a Filter message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof movies.filters.v1.Filter
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {movies.filters.v1.Filter} Filter
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Filter.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a Filter message.
                     * @function verify
                     * @memberof movies.filters.v1.Filter
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    Filter.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        var properties = {};
                        if (message.range != null && message.hasOwnProperty("range")) {
                            properties.kind = 1;
                            {
                                var error = $root.movies.filters.v1.RangeFilter.verify(message.range);
                                if (error)
                                    return "range." + error;
                            }
                        }
                        if (message.tokens != null && message.hasOwnProperty("tokens")) {
                            if (properties.kind === 1)
                                return "kind: multiple values";
                            properties.kind = 1;
                            {
                                var error = $root.movies.filters.v1.TokensFilter.verify(message.tokens);
                                if (error)
                                    return "tokens." + error;
                            }
                        }
                        if (message.onOff != null && message.hasOwnProperty("onOff")) {
                            if (properties.kind === 1)
                                return "kind: multiple values";
                            properties.kind = 1;
                            {
                                var error = $root.movies.filters.v1.OnOffFilter.verify(message.onOff);
                                if (error)
                                    return "onOff." + error;
                            }
                        }
                        return null;
                    };
    
                    /**
                     * Creates a Filter message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof movies.filters.v1.Filter
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {movies.filters.v1.Filter} Filter
                     */
                    Filter.fromObject = function fromObject(object) {
                        if (object instanceof $root.movies.filters.v1.Filter)
                            return object;
                        var message = new $root.movies.filters.v1.Filter();
                        if (object.range != null) {
                            if (typeof object.range !== "object")
                                throw TypeError(".movies.filters.v1.Filter.range: object expected");
                            message.range = $root.movies.filters.v1.RangeFilter.fromObject(object.range);
                        }
                        if (object.tokens != null) {
                            if (typeof object.tokens !== "object")
                                throw TypeError(".movies.filters.v1.Filter.tokens: object expected");
                            message.tokens = $root.movies.filters.v1.TokensFilter.fromObject(object.tokens);
                        }
                        if (object.onOff != null) {
                            if (typeof object.onOff !== "object")
                                throw TypeError(".movies.filters.v1.Filter.onOff: object expected");
                            message.onOff = $root.movies.filters.v1.OnOffFilter.fromObject(object.onOff);
                        }
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a Filter message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof movies.filters.v1.Filter
                     * @static
                     * @param {movies.filters.v1.Filter} message Filter
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Filter.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (message.range != null && message.hasOwnProperty("range")) {
                            object.range = $root.movies.filters.v1.RangeFilter.toObject(message.range, options);
                            if (options.oneofs)
                                object.kind = "range";
                        }
                        if (message.tokens != null && message.hasOwnProperty("tokens")) {
                            object.tokens = $root.movies.filters.v1.TokensFilter.toObject(message.tokens, options);
                            if (options.oneofs)
                                object.kind = "tokens";
                        }
                        if (message.onOff != null && message.hasOwnProperty("onOff")) {
                            object.onOff = $root.movies.filters.v1.OnOffFilter.toObject(message.onOff, options);
                            if (options.oneofs)
                                object.kind = "onOff";
                        }
                        return object;
                    };
    
                    /**
                     * Converts this Filter to JSON.
                     * @function toJSON
                     * @memberof movies.filters.v1.Filter
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Filter.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    return Filter;
                })();
    
                v1.DescriptionId = (function() {
    
                    /**
                     * Properties of a DescriptionId.
                     * @memberof movies.filters.v1
                     * @interface IDescriptionId
                     * @property {string|null} [field] DescriptionId field
                     * @property {string|null} [label] DescriptionId label
                     * @property {string|null} [icon] DescriptionId icon
                     */
    
                    /**
                     * Constructs a new DescriptionId.
                     * @memberof movies.filters.v1
                     * @classdesc Represents a DescriptionId.
                     * @implements IDescriptionId
                     * @constructor
                     * @param {movies.filters.v1.IDescriptionId=} [properties] Properties to set
                     */
                    function DescriptionId(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * DescriptionId field.
                     * @member {string} field
                     * @memberof movies.filters.v1.DescriptionId
                     * @instance
                     */
                    DescriptionId.prototype.field = "";
    
                    /**
                     * DescriptionId label.
                     * @member {string} label
                     * @memberof movies.filters.v1.DescriptionId
                     * @instance
                     */
                    DescriptionId.prototype.label = "";
    
                    /**
                     * DescriptionId icon.
                     * @member {string|null|undefined} icon
                     * @memberof movies.filters.v1.DescriptionId
                     * @instance
                     */
                    DescriptionId.prototype.icon = null;
    
                    // OneOf field names bound to virtual getters and setters
                    var $oneOfFields;
    
                    /**
                     * DescriptionId _icon.
                     * @member {"icon"|undefined} _icon
                     * @memberof movies.filters.v1.DescriptionId
                     * @instance
                     */
                    Object.defineProperty(DescriptionId.prototype, "_icon", {
                        get: $util.oneOfGetter($oneOfFields = ["icon"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });
    
                    /**
                     * Creates a new DescriptionId instance using the specified properties.
                     * @function create
                     * @memberof movies.filters.v1.DescriptionId
                     * @static
                     * @param {movies.filters.v1.IDescriptionId=} [properties] Properties to set
                     * @returns {movies.filters.v1.DescriptionId} DescriptionId instance
                     */
                    DescriptionId.create = function create(properties) {
                        return new DescriptionId(properties);
                    };
    
                    /**
                     * Encodes the specified DescriptionId message. Does not implicitly {@link movies.filters.v1.DescriptionId.verify|verify} messages.
                     * @function encode
                     * @memberof movies.filters.v1.DescriptionId
                     * @static
                     * @param {movies.filters.v1.IDescriptionId} message DescriptionId message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    DescriptionId.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.field != null && Object.hasOwnProperty.call(message, "field"))
                            writer.uint32(/* id 1, wireType 2 =*/10).string(message.field);
                        if (message.label != null && Object.hasOwnProperty.call(message, "label"))
                            writer.uint32(/* id 2, wireType 2 =*/18).string(message.label);
                        if (message.icon != null && Object.hasOwnProperty.call(message, "icon"))
                            writer.uint32(/* id 3, wireType 2 =*/26).string(message.icon);
                        return writer;
                    };
    
                    /**
                     * Encodes the specified DescriptionId message, length delimited. Does not implicitly {@link movies.filters.v1.DescriptionId.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof movies.filters.v1.DescriptionId
                     * @static
                     * @param {movies.filters.v1.IDescriptionId} message DescriptionId message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    DescriptionId.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a DescriptionId message from the specified reader or buffer.
                     * @function decode
                     * @memberof movies.filters.v1.DescriptionId
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {movies.filters.v1.DescriptionId} DescriptionId
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    DescriptionId.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.movies.filters.v1.DescriptionId();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.field = reader.string();
                                break;
                            case 2:
                                message.label = reader.string();
                                break;
                            case 3:
                                message.icon = reader.string();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes a DescriptionId message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof movies.filters.v1.DescriptionId
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {movies.filters.v1.DescriptionId} DescriptionId
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    DescriptionId.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a DescriptionId message.
                     * @function verify
                     * @memberof movies.filters.v1.DescriptionId
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    DescriptionId.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        var properties = {};
                        if (message.field != null && message.hasOwnProperty("field"))
                            if (!$util.isString(message.field))
                                return "field: string expected";
                        if (message.label != null && message.hasOwnProperty("label"))
                            if (!$util.isString(message.label))
                                return "label: string expected";
                        if (message.icon != null && message.hasOwnProperty("icon")) {
                            properties._icon = 1;
                            if (!$util.isString(message.icon))
                                return "icon: string expected";
                        }
                        return null;
                    };
    
                    /**
                     * Creates a DescriptionId message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof movies.filters.v1.DescriptionId
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {movies.filters.v1.DescriptionId} DescriptionId
                     */
                    DescriptionId.fromObject = function fromObject(object) {
                        if (object instanceof $root.movies.filters.v1.DescriptionId)
                            return object;
                        var message = new $root.movies.filters.v1.DescriptionId();
                        if (object.field != null)
                            message.field = String(object.field);
                        if (object.label != null)
                            message.label = String(object.label);
                        if (object.icon != null)
                            message.icon = String(object.icon);
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a DescriptionId message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof movies.filters.v1.DescriptionId
                     * @static
                     * @param {movies.filters.v1.DescriptionId} message DescriptionId
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    DescriptionId.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.defaults) {
                            object.field = "";
                            object.label = "";
                        }
                        if (message.field != null && message.hasOwnProperty("field"))
                            object.field = message.field;
                        if (message.label != null && message.hasOwnProperty("label"))
                            object.label = message.label;
                        if (message.icon != null && message.hasOwnProperty("icon")) {
                            object.icon = message.icon;
                            if (options.oneofs)
                                object._icon = "icon";
                        }
                        return object;
                    };
    
                    /**
                     * Converts this DescriptionId to JSON.
                     * @function toJSON
                     * @memberof movies.filters.v1.DescriptionId
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    DescriptionId.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    return DescriptionId;
                })();
    
                v1.RangeFilterDescription = (function() {
    
                    /**
                     * Properties of a RangeFilterDescription.
                     * @memberof movies.filters.v1
                     * @interface IRangeFilterDescription
                     * @property {number|null} [low] RangeFilterDescription low
                     * @property {number|null} [high] RangeFilterDescription high
                     * @property {boolean|null} [isOptional] RangeFilterDescription isOptional
                     * @property {number|null} [step] RangeFilterDescription step
                     * @property {movies.filters.v1.RangeFilterDescription.IList|null} [steps] RangeFilterDescription steps
                     */
    
                    /**
                     * Constructs a new RangeFilterDescription.
                     * @memberof movies.filters.v1
                     * @classdesc Represents a RangeFilterDescription.
                     * @implements IRangeFilterDescription
                     * @constructor
                     * @param {movies.filters.v1.IRangeFilterDescription=} [properties] Properties to set
                     */
                    function RangeFilterDescription(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * RangeFilterDescription low.
                     * @member {number} low
                     * @memberof movies.filters.v1.RangeFilterDescription
                     * @instance
                     */
                    RangeFilterDescription.prototype.low = 0;
    
                    /**
                     * RangeFilterDescription high.
                     * @member {number} high
                     * @memberof movies.filters.v1.RangeFilterDescription
                     * @instance
                     */
                    RangeFilterDescription.prototype.high = 0;
    
                    /**
                     * RangeFilterDescription isOptional.
                     * @member {boolean} isOptional
                     * @memberof movies.filters.v1.RangeFilterDescription
                     * @instance
                     */
                    RangeFilterDescription.prototype.isOptional = false;
    
                    /**
                     * RangeFilterDescription step.
                     * @member {number|null|undefined} step
                     * @memberof movies.filters.v1.RangeFilterDescription
                     * @instance
                     */
                    RangeFilterDescription.prototype.step = null;
    
                    /**
                     * RangeFilterDescription steps.
                     * @member {movies.filters.v1.RangeFilterDescription.IList|null|undefined} steps
                     * @memberof movies.filters.v1.RangeFilterDescription
                     * @instance
                     */
                    RangeFilterDescription.prototype.steps = null;
    
                    // OneOf field names bound to virtual getters and setters
                    var $oneOfFields;
    
                    /**
                     * RangeFilterDescription type.
                     * @member {"step"|"steps"|undefined} type
                     * @memberof movies.filters.v1.RangeFilterDescription
                     * @instance
                     */
                    Object.defineProperty(RangeFilterDescription.prototype, "type", {
                        get: $util.oneOfGetter($oneOfFields = ["step", "steps"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });
    
                    /**
                     * Creates a new RangeFilterDescription instance using the specified properties.
                     * @function create
                     * @memberof movies.filters.v1.RangeFilterDescription
                     * @static
                     * @param {movies.filters.v1.IRangeFilterDescription=} [properties] Properties to set
                     * @returns {movies.filters.v1.RangeFilterDescription} RangeFilterDescription instance
                     */
                    RangeFilterDescription.create = function create(properties) {
                        return new RangeFilterDescription(properties);
                    };
    
                    /**
                     * Encodes the specified RangeFilterDescription message. Does not implicitly {@link movies.filters.v1.RangeFilterDescription.verify|verify} messages.
                     * @function encode
                     * @memberof movies.filters.v1.RangeFilterDescription
                     * @static
                     * @param {movies.filters.v1.IRangeFilterDescription} message RangeFilterDescription message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    RangeFilterDescription.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.low != null && Object.hasOwnProperty.call(message, "low"))
                            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.low);
                        if (message.high != null && Object.hasOwnProperty.call(message, "high"))
                            writer.uint32(/* id 2, wireType 0 =*/16).int32(message.high);
                        if (message.isOptional != null && Object.hasOwnProperty.call(message, "isOptional"))
                            writer.uint32(/* id 3, wireType 0 =*/24).bool(message.isOptional);
                        if (message.step != null && Object.hasOwnProperty.call(message, "step"))
                            writer.uint32(/* id 4, wireType 0 =*/32).int32(message.step);
                        if (message.steps != null && Object.hasOwnProperty.call(message, "steps"))
                            $root.movies.filters.v1.RangeFilterDescription.List.encode(message.steps, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                        return writer;
                    };
    
                    /**
                     * Encodes the specified RangeFilterDescription message, length delimited. Does not implicitly {@link movies.filters.v1.RangeFilterDescription.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof movies.filters.v1.RangeFilterDescription
                     * @static
                     * @param {movies.filters.v1.IRangeFilterDescription} message RangeFilterDescription message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    RangeFilterDescription.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a RangeFilterDescription message from the specified reader or buffer.
                     * @function decode
                     * @memberof movies.filters.v1.RangeFilterDescription
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {movies.filters.v1.RangeFilterDescription} RangeFilterDescription
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    RangeFilterDescription.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.movies.filters.v1.RangeFilterDescription();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.low = reader.int32();
                                break;
                            case 2:
                                message.high = reader.int32();
                                break;
                            case 3:
                                message.isOptional = reader.bool();
                                break;
                            case 4:
                                message.step = reader.int32();
                                break;
                            case 5:
                                message.steps = $root.movies.filters.v1.RangeFilterDescription.List.decode(reader, reader.uint32());
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes a RangeFilterDescription message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof movies.filters.v1.RangeFilterDescription
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {movies.filters.v1.RangeFilterDescription} RangeFilterDescription
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    RangeFilterDescription.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a RangeFilterDescription message.
                     * @function verify
                     * @memberof movies.filters.v1.RangeFilterDescription
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    RangeFilterDescription.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        var properties = {};
                        if (message.low != null && message.hasOwnProperty("low"))
                            if (!$util.isInteger(message.low))
                                return "low: integer expected";
                        if (message.high != null && message.hasOwnProperty("high"))
                            if (!$util.isInteger(message.high))
                                return "high: integer expected";
                        if (message.isOptional != null && message.hasOwnProperty("isOptional"))
                            if (typeof message.isOptional !== "boolean")
                                return "isOptional: boolean expected";
                        if (message.step != null && message.hasOwnProperty("step")) {
                            properties.type = 1;
                            if (!$util.isInteger(message.step))
                                return "step: integer expected";
                        }
                        if (message.steps != null && message.hasOwnProperty("steps")) {
                            if (properties.type === 1)
                                return "type: multiple values";
                            properties.type = 1;
                            {
                                var error = $root.movies.filters.v1.RangeFilterDescription.List.verify(message.steps);
                                if (error)
                                    return "steps." + error;
                            }
                        }
                        return null;
                    };
    
                    /**
                     * Creates a RangeFilterDescription message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof movies.filters.v1.RangeFilterDescription
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {movies.filters.v1.RangeFilterDescription} RangeFilterDescription
                     */
                    RangeFilterDescription.fromObject = function fromObject(object) {
                        if (object instanceof $root.movies.filters.v1.RangeFilterDescription)
                            return object;
                        var message = new $root.movies.filters.v1.RangeFilterDescription();
                        if (object.low != null)
                            message.low = object.low | 0;
                        if (object.high != null)
                            message.high = object.high | 0;
                        if (object.isOptional != null)
                            message.isOptional = Boolean(object.isOptional);
                        if (object.step != null)
                            message.step = object.step | 0;
                        if (object.steps != null) {
                            if (typeof object.steps !== "object")
                                throw TypeError(".movies.filters.v1.RangeFilterDescription.steps: object expected");
                            message.steps = $root.movies.filters.v1.RangeFilterDescription.List.fromObject(object.steps);
                        }
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a RangeFilterDescription message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof movies.filters.v1.RangeFilterDescription
                     * @static
                     * @param {movies.filters.v1.RangeFilterDescription} message RangeFilterDescription
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    RangeFilterDescription.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.defaults) {
                            object.low = 0;
                            object.high = 0;
                            object.isOptional = false;
                        }
                        if (message.low != null && message.hasOwnProperty("low"))
                            object.low = message.low;
                        if (message.high != null && message.hasOwnProperty("high"))
                            object.high = message.high;
                        if (message.isOptional != null && message.hasOwnProperty("isOptional"))
                            object.isOptional = message.isOptional;
                        if (message.step != null && message.hasOwnProperty("step")) {
                            object.step = message.step;
                            if (options.oneofs)
                                object.type = "step";
                        }
                        if (message.steps != null && message.hasOwnProperty("steps")) {
                            object.steps = $root.movies.filters.v1.RangeFilterDescription.List.toObject(message.steps, options);
                            if (options.oneofs)
                                object.type = "steps";
                        }
                        return object;
                    };
    
                    /**
                     * Converts this RangeFilterDescription to JSON.
                     * @function toJSON
                     * @memberof movies.filters.v1.RangeFilterDescription
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    RangeFilterDescription.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    RangeFilterDescription.List = (function() {
    
                        /**
                         * Properties of a List.
                         * @memberof movies.filters.v1.RangeFilterDescription
                         * @interface IList
                         * @property {Array.<number>|null} [items] List items
                         */
    
                        /**
                         * Constructs a new List.
                         * @memberof movies.filters.v1.RangeFilterDescription
                         * @classdesc Represents a List.
                         * @implements IList
                         * @constructor
                         * @param {movies.filters.v1.RangeFilterDescription.IList=} [properties] Properties to set
                         */
                        function List(properties) {
                            this.items = [];
                            if (properties)
                                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                    if (properties[keys[i]] != null)
                                        this[keys[i]] = properties[keys[i]];
                        }
    
                        /**
                         * List items.
                         * @member {Array.<number>} items
                         * @memberof movies.filters.v1.RangeFilterDescription.List
                         * @instance
                         */
                        List.prototype.items = $util.emptyArray;
    
                        /**
                         * Creates a new List instance using the specified properties.
                         * @function create
                         * @memberof movies.filters.v1.RangeFilterDescription.List
                         * @static
                         * @param {movies.filters.v1.RangeFilterDescription.IList=} [properties] Properties to set
                         * @returns {movies.filters.v1.RangeFilterDescription.List} List instance
                         */
                        List.create = function create(properties) {
                            return new List(properties);
                        };
    
                        /**
                         * Encodes the specified List message. Does not implicitly {@link movies.filters.v1.RangeFilterDescription.List.verify|verify} messages.
                         * @function encode
                         * @memberof movies.filters.v1.RangeFilterDescription.List
                         * @static
                         * @param {movies.filters.v1.RangeFilterDescription.IList} message List message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        List.encode = function encode(message, writer) {
                            if (!writer)
                                writer = $Writer.create();
                            if (message.items != null && message.items.length) {
                                writer.uint32(/* id 1, wireType 2 =*/10).fork();
                                for (var i = 0; i < message.items.length; ++i)
                                    writer.int32(message.items[i]);
                                writer.ldelim();
                            }
                            return writer;
                        };
    
                        /**
                         * Encodes the specified List message, length delimited. Does not implicitly {@link movies.filters.v1.RangeFilterDescription.List.verify|verify} messages.
                         * @function encodeDelimited
                         * @memberof movies.filters.v1.RangeFilterDescription.List
                         * @static
                         * @param {movies.filters.v1.RangeFilterDescription.IList} message List message or plain object to encode
                         * @param {$protobuf.Writer} [writer] Writer to encode to
                         * @returns {$protobuf.Writer} Writer
                         */
                        List.encodeDelimited = function encodeDelimited(message, writer) {
                            return this.encode(message, writer).ldelim();
                        };
    
                        /**
                         * Decodes a List message from the specified reader or buffer.
                         * @function decode
                         * @memberof movies.filters.v1.RangeFilterDescription.List
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @param {number} [length] Message length if known beforehand
                         * @returns {movies.filters.v1.RangeFilterDescription.List} List
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        List.decode = function decode(reader, length) {
                            if (!(reader instanceof $Reader))
                                reader = $Reader.create(reader);
                            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.movies.filters.v1.RangeFilterDescription.List();
                            while (reader.pos < end) {
                                var tag = reader.uint32();
                                switch (tag >>> 3) {
                                case 1:
                                    if (!(message.items && message.items.length))
                                        message.items = [];
                                    if ((tag & 7) === 2) {
                                        var end2 = reader.uint32() + reader.pos;
                                        while (reader.pos < end2)
                                            message.items.push(reader.int32());
                                    } else
                                        message.items.push(reader.int32());
                                    break;
                                default:
                                    reader.skipType(tag & 7);
                                    break;
                                }
                            }
                            return message;
                        };
    
                        /**
                         * Decodes a List message from the specified reader or buffer, length delimited.
                         * @function decodeDelimited
                         * @memberof movies.filters.v1.RangeFilterDescription.List
                         * @static
                         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                         * @returns {movies.filters.v1.RangeFilterDescription.List} List
                         * @throws {Error} If the payload is not a reader or valid buffer
                         * @throws {$protobuf.util.ProtocolError} If required fields are missing
                         */
                        List.decodeDelimited = function decodeDelimited(reader) {
                            if (!(reader instanceof $Reader))
                                reader = new $Reader(reader);
                            return this.decode(reader, reader.uint32());
                        };
    
                        /**
                         * Verifies a List message.
                         * @function verify
                         * @memberof movies.filters.v1.RangeFilterDescription.List
                         * @static
                         * @param {Object.<string,*>} message Plain object to verify
                         * @returns {string|null} `null` if valid, otherwise the reason why it is not
                         */
                        List.verify = function verify(message) {
                            if (typeof message !== "object" || message === null)
                                return "object expected";
                            if (message.items != null && message.hasOwnProperty("items")) {
                                if (!Array.isArray(message.items))
                                    return "items: array expected";
                                for (var i = 0; i < message.items.length; ++i)
                                    if (!$util.isInteger(message.items[i]))
                                        return "items: integer[] expected";
                            }
                            return null;
                        };
    
                        /**
                         * Creates a List message from a plain object. Also converts values to their respective internal types.
                         * @function fromObject
                         * @memberof movies.filters.v1.RangeFilterDescription.List
                         * @static
                         * @param {Object.<string,*>} object Plain object
                         * @returns {movies.filters.v1.RangeFilterDescription.List} List
                         */
                        List.fromObject = function fromObject(object) {
                            if (object instanceof $root.movies.filters.v1.RangeFilterDescription.List)
                                return object;
                            var message = new $root.movies.filters.v1.RangeFilterDescription.List();
                            if (object.items) {
                                if (!Array.isArray(object.items))
                                    throw TypeError(".movies.filters.v1.RangeFilterDescription.List.items: array expected");
                                message.items = [];
                                for (var i = 0; i < object.items.length; ++i)
                                    message.items[i] = object.items[i] | 0;
                            }
                            return message;
                        };
    
                        /**
                         * Creates a plain object from a List message. Also converts values to other types if specified.
                         * @function toObject
                         * @memberof movies.filters.v1.RangeFilterDescription.List
                         * @static
                         * @param {movies.filters.v1.RangeFilterDescription.List} message List
                         * @param {$protobuf.IConversionOptions} [options] Conversion options
                         * @returns {Object.<string,*>} Plain object
                         */
                        List.toObject = function toObject(message, options) {
                            if (!options)
                                options = {};
                            var object = {};
                            if (options.arrays || options.defaults)
                                object.items = [];
                            if (message.items && message.items.length) {
                                object.items = [];
                                for (var j = 0; j < message.items.length; ++j)
                                    object.items[j] = message.items[j];
                            }
                            return object;
                        };
    
                        /**
                         * Converts this List to JSON.
                         * @function toJSON
                         * @memberof movies.filters.v1.RangeFilterDescription.List
                         * @instance
                         * @returns {Object.<string,*>} JSON object
                         */
                        List.prototype.toJSON = function toJSON() {
                            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                        };
    
                        return List;
                    })();
    
                    return RangeFilterDescription;
                })();
    
                v1.TokensFilterDescription = (function() {
    
                    /**
                     * Properties of a TokensFilterDescription.
                     * @memberof movies.filters.v1
                     * @interface ITokensFilterDescription
                     * @property {Array.<string>|null} [values] TokensFilterDescription values
                     */
    
                    /**
                     * Constructs a new TokensFilterDescription.
                     * @memberof movies.filters.v1
                     * @classdesc Represents a TokensFilterDescription.
                     * @implements ITokensFilterDescription
                     * @constructor
                     * @param {movies.filters.v1.ITokensFilterDescription=} [properties] Properties to set
                     */
                    function TokensFilterDescription(properties) {
                        this.values = [];
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * TokensFilterDescription values.
                     * @member {Array.<string>} values
                     * @memberof movies.filters.v1.TokensFilterDescription
                     * @instance
                     */
                    TokensFilterDescription.prototype.values = $util.emptyArray;
    
                    /**
                     * Creates a new TokensFilterDescription instance using the specified properties.
                     * @function create
                     * @memberof movies.filters.v1.TokensFilterDescription
                     * @static
                     * @param {movies.filters.v1.ITokensFilterDescription=} [properties] Properties to set
                     * @returns {movies.filters.v1.TokensFilterDescription} TokensFilterDescription instance
                     */
                    TokensFilterDescription.create = function create(properties) {
                        return new TokensFilterDescription(properties);
                    };
    
                    /**
                     * Encodes the specified TokensFilterDescription message. Does not implicitly {@link movies.filters.v1.TokensFilterDescription.verify|verify} messages.
                     * @function encode
                     * @memberof movies.filters.v1.TokensFilterDescription
                     * @static
                     * @param {movies.filters.v1.ITokensFilterDescription} message TokensFilterDescription message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    TokensFilterDescription.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.values != null && message.values.length)
                            for (var i = 0; i < message.values.length; ++i)
                                writer.uint32(/* id 1, wireType 2 =*/10).string(message.values[i]);
                        return writer;
                    };
    
                    /**
                     * Encodes the specified TokensFilterDescription message, length delimited. Does not implicitly {@link movies.filters.v1.TokensFilterDescription.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof movies.filters.v1.TokensFilterDescription
                     * @static
                     * @param {movies.filters.v1.ITokensFilterDescription} message TokensFilterDescription message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    TokensFilterDescription.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a TokensFilterDescription message from the specified reader or buffer.
                     * @function decode
                     * @memberof movies.filters.v1.TokensFilterDescription
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {movies.filters.v1.TokensFilterDescription} TokensFilterDescription
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    TokensFilterDescription.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.movies.filters.v1.TokensFilterDescription();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                if (!(message.values && message.values.length))
                                    message.values = [];
                                message.values.push(reader.string());
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes a TokensFilterDescription message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof movies.filters.v1.TokensFilterDescription
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {movies.filters.v1.TokensFilterDescription} TokensFilterDescription
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    TokensFilterDescription.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a TokensFilterDescription message.
                     * @function verify
                     * @memberof movies.filters.v1.TokensFilterDescription
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    TokensFilterDescription.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.values != null && message.hasOwnProperty("values")) {
                            if (!Array.isArray(message.values))
                                return "values: array expected";
                            for (var i = 0; i < message.values.length; ++i)
                                if (!$util.isString(message.values[i]))
                                    return "values: string[] expected";
                        }
                        return null;
                    };
    
                    /**
                     * Creates a TokensFilterDescription message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof movies.filters.v1.TokensFilterDescription
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {movies.filters.v1.TokensFilterDescription} TokensFilterDescription
                     */
                    TokensFilterDescription.fromObject = function fromObject(object) {
                        if (object instanceof $root.movies.filters.v1.TokensFilterDescription)
                            return object;
                        var message = new $root.movies.filters.v1.TokensFilterDescription();
                        if (object.values) {
                            if (!Array.isArray(object.values))
                                throw TypeError(".movies.filters.v1.TokensFilterDescription.values: array expected");
                            message.values = [];
                            for (var i = 0; i < object.values.length; ++i)
                                message.values[i] = String(object.values[i]);
                        }
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a TokensFilterDescription message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof movies.filters.v1.TokensFilterDescription
                     * @static
                     * @param {movies.filters.v1.TokensFilterDescription} message TokensFilterDescription
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    TokensFilterDescription.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.arrays || options.defaults)
                            object.values = [];
                        if (message.values && message.values.length) {
                            object.values = [];
                            for (var j = 0; j < message.values.length; ++j)
                                object.values[j] = message.values[j];
                        }
                        return object;
                    };
    
                    /**
                     * Converts this TokensFilterDescription to JSON.
                     * @function toJSON
                     * @memberof movies.filters.v1.TokensFilterDescription
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    TokensFilterDescription.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    return TokensFilterDescription;
                })();
    
                v1.OnOffFilterDescription = (function() {
    
                    /**
                     * Properties of an OnOffFilterDescription.
                     * @memberof movies.filters.v1
                     * @interface IOnOffFilterDescription
                     * @property {string|null} [oppositeLabel] OnOffFilterDescription oppositeLabel
                     */
    
                    /**
                     * Constructs a new OnOffFilterDescription.
                     * @memberof movies.filters.v1
                     * @classdesc Represents an OnOffFilterDescription.
                     * @implements IOnOffFilterDescription
                     * @constructor
                     * @param {movies.filters.v1.IOnOffFilterDescription=} [properties] Properties to set
                     */
                    function OnOffFilterDescription(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * OnOffFilterDescription oppositeLabel.
                     * @member {string} oppositeLabel
                     * @memberof movies.filters.v1.OnOffFilterDescription
                     * @instance
                     */
                    OnOffFilterDescription.prototype.oppositeLabel = "";
    
                    /**
                     * Creates a new OnOffFilterDescription instance using the specified properties.
                     * @function create
                     * @memberof movies.filters.v1.OnOffFilterDescription
                     * @static
                     * @param {movies.filters.v1.IOnOffFilterDescription=} [properties] Properties to set
                     * @returns {movies.filters.v1.OnOffFilterDescription} OnOffFilterDescription instance
                     */
                    OnOffFilterDescription.create = function create(properties) {
                        return new OnOffFilterDescription(properties);
                    };
    
                    /**
                     * Encodes the specified OnOffFilterDescription message. Does not implicitly {@link movies.filters.v1.OnOffFilterDescription.verify|verify} messages.
                     * @function encode
                     * @memberof movies.filters.v1.OnOffFilterDescription
                     * @static
                     * @param {movies.filters.v1.IOnOffFilterDescription} message OnOffFilterDescription message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    OnOffFilterDescription.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.oppositeLabel != null && Object.hasOwnProperty.call(message, "oppositeLabel"))
                            writer.uint32(/* id 1, wireType 2 =*/10).string(message.oppositeLabel);
                        return writer;
                    };
    
                    /**
                     * Encodes the specified OnOffFilterDescription message, length delimited. Does not implicitly {@link movies.filters.v1.OnOffFilterDescription.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof movies.filters.v1.OnOffFilterDescription
                     * @static
                     * @param {movies.filters.v1.IOnOffFilterDescription} message OnOffFilterDescription message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    OnOffFilterDescription.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes an OnOffFilterDescription message from the specified reader or buffer.
                     * @function decode
                     * @memberof movies.filters.v1.OnOffFilterDescription
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {movies.filters.v1.OnOffFilterDescription} OnOffFilterDescription
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    OnOffFilterDescription.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.movies.filters.v1.OnOffFilterDescription();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.oppositeLabel = reader.string();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes an OnOffFilterDescription message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof movies.filters.v1.OnOffFilterDescription
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {movies.filters.v1.OnOffFilterDescription} OnOffFilterDescription
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    OnOffFilterDescription.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies an OnOffFilterDescription message.
                     * @function verify
                     * @memberof movies.filters.v1.OnOffFilterDescription
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    OnOffFilterDescription.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.oppositeLabel != null && message.hasOwnProperty("oppositeLabel"))
                            if (!$util.isString(message.oppositeLabel))
                                return "oppositeLabel: string expected";
                        return null;
                    };
    
                    /**
                     * Creates an OnOffFilterDescription message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof movies.filters.v1.OnOffFilterDescription
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {movies.filters.v1.OnOffFilterDescription} OnOffFilterDescription
                     */
                    OnOffFilterDescription.fromObject = function fromObject(object) {
                        if (object instanceof $root.movies.filters.v1.OnOffFilterDescription)
                            return object;
                        var message = new $root.movies.filters.v1.OnOffFilterDescription();
                        if (object.oppositeLabel != null)
                            message.oppositeLabel = String(object.oppositeLabel);
                        return message;
                    };
    
                    /**
                     * Creates a plain object from an OnOffFilterDescription message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof movies.filters.v1.OnOffFilterDescription
                     * @static
                     * @param {movies.filters.v1.OnOffFilterDescription} message OnOffFilterDescription
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    OnOffFilterDescription.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.defaults)
                            object.oppositeLabel = "";
                        if (message.oppositeLabel != null && message.hasOwnProperty("oppositeLabel"))
                            object.oppositeLabel = message.oppositeLabel;
                        return object;
                    };
    
                    /**
                     * Converts this OnOffFilterDescription to JSON.
                     * @function toJSON
                     * @memberof movies.filters.v1.OnOffFilterDescription
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    OnOffFilterDescription.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    return OnOffFilterDescription;
                })();
    
                v1.FilterDescription = (function() {
    
                    /**
                     * Properties of a FilterDescription.
                     * @memberof movies.filters.v1
                     * @interface IFilterDescription
                     * @property {movies.filters.v1.IDescriptionId|null} [id] FilterDescription id
                     * @property {movies.filters.v1.IRangeFilterDescription|null} [range] FilterDescription range
                     * @property {movies.filters.v1.ITokensFilterDescription|null} [tokens] FilterDescription tokens
                     * @property {movies.filters.v1.IOnOffFilterDescription|null} [onOff] FilterDescription onOff
                     */
    
                    /**
                     * Constructs a new FilterDescription.
                     * @memberof movies.filters.v1
                     * @classdesc Represents a FilterDescription.
                     * @implements IFilterDescription
                     * @constructor
                     * @param {movies.filters.v1.IFilterDescription=} [properties] Properties to set
                     */
                    function FilterDescription(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * FilterDescription id.
                     * @member {movies.filters.v1.IDescriptionId|null|undefined} id
                     * @memberof movies.filters.v1.FilterDescription
                     * @instance
                     */
                    FilterDescription.prototype.id = null;
    
                    /**
                     * FilterDescription range.
                     * @member {movies.filters.v1.IRangeFilterDescription|null|undefined} range
                     * @memberof movies.filters.v1.FilterDescription
                     * @instance
                     */
                    FilterDescription.prototype.range = null;
    
                    /**
                     * FilterDescription tokens.
                     * @member {movies.filters.v1.ITokensFilterDescription|null|undefined} tokens
                     * @memberof movies.filters.v1.FilterDescription
                     * @instance
                     */
                    FilterDescription.prototype.tokens = null;
    
                    /**
                     * FilterDescription onOff.
                     * @member {movies.filters.v1.IOnOffFilterDescription|null|undefined} onOff
                     * @memberof movies.filters.v1.FilterDescription
                     * @instance
                     */
                    FilterDescription.prototype.onOff = null;
    
                    // OneOf field names bound to virtual getters and setters
                    var $oneOfFields;
    
                    /**
                     * FilterDescription kind.
                     * @member {"range"|"tokens"|"onOff"|undefined} kind
                     * @memberof movies.filters.v1.FilterDescription
                     * @instance
                     */
                    Object.defineProperty(FilterDescription.prototype, "kind", {
                        get: $util.oneOfGetter($oneOfFields = ["range", "tokens", "onOff"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });
    
                    /**
                     * Creates a new FilterDescription instance using the specified properties.
                     * @function create
                     * @memberof movies.filters.v1.FilterDescription
                     * @static
                     * @param {movies.filters.v1.IFilterDescription=} [properties] Properties to set
                     * @returns {movies.filters.v1.FilterDescription} FilterDescription instance
                     */
                    FilterDescription.create = function create(properties) {
                        return new FilterDescription(properties);
                    };
    
                    /**
                     * Encodes the specified FilterDescription message. Does not implicitly {@link movies.filters.v1.FilterDescription.verify|verify} messages.
                     * @function encode
                     * @memberof movies.filters.v1.FilterDescription
                     * @static
                     * @param {movies.filters.v1.IFilterDescription} message FilterDescription message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    FilterDescription.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                            $root.movies.filters.v1.DescriptionId.encode(message.id, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                        if (message.range != null && Object.hasOwnProperty.call(message, "range"))
                            $root.movies.filters.v1.RangeFilterDescription.encode(message.range, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                        if (message.tokens != null && Object.hasOwnProperty.call(message, "tokens"))
                            $root.movies.filters.v1.TokensFilterDescription.encode(message.tokens, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                        if (message.onOff != null && Object.hasOwnProperty.call(message, "onOff"))
                            $root.movies.filters.v1.OnOffFilterDescription.encode(message.onOff, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                        return writer;
                    };
    
                    /**
                     * Encodes the specified FilterDescription message, length delimited. Does not implicitly {@link movies.filters.v1.FilterDescription.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof movies.filters.v1.FilterDescription
                     * @static
                     * @param {movies.filters.v1.IFilterDescription} message FilterDescription message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    FilterDescription.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a FilterDescription message from the specified reader or buffer.
                     * @function decode
                     * @memberof movies.filters.v1.FilterDescription
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {movies.filters.v1.FilterDescription} FilterDescription
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    FilterDescription.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.movies.filters.v1.FilterDescription();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.id = $root.movies.filters.v1.DescriptionId.decode(reader, reader.uint32());
                                break;
                            case 2:
                                message.range = $root.movies.filters.v1.RangeFilterDescription.decode(reader, reader.uint32());
                                break;
                            case 3:
                                message.tokens = $root.movies.filters.v1.TokensFilterDescription.decode(reader, reader.uint32());
                                break;
                            case 4:
                                message.onOff = $root.movies.filters.v1.OnOffFilterDescription.decode(reader, reader.uint32());
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes a FilterDescription message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof movies.filters.v1.FilterDescription
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {movies.filters.v1.FilterDescription} FilterDescription
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    FilterDescription.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a FilterDescription message.
                     * @function verify
                     * @memberof movies.filters.v1.FilterDescription
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    FilterDescription.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        var properties = {};
                        if (message.id != null && message.hasOwnProperty("id")) {
                            var error = $root.movies.filters.v1.DescriptionId.verify(message.id);
                            if (error)
                                return "id." + error;
                        }
                        if (message.range != null && message.hasOwnProperty("range")) {
                            properties.kind = 1;
                            {
                                var error = $root.movies.filters.v1.RangeFilterDescription.verify(message.range);
                                if (error)
                                    return "range." + error;
                            }
                        }
                        if (message.tokens != null && message.hasOwnProperty("tokens")) {
                            if (properties.kind === 1)
                                return "kind: multiple values";
                            properties.kind = 1;
                            {
                                var error = $root.movies.filters.v1.TokensFilterDescription.verify(message.tokens);
                                if (error)
                                    return "tokens." + error;
                            }
                        }
                        if (message.onOff != null && message.hasOwnProperty("onOff")) {
                            if (properties.kind === 1)
                                return "kind: multiple values";
                            properties.kind = 1;
                            {
                                var error = $root.movies.filters.v1.OnOffFilterDescription.verify(message.onOff);
                                if (error)
                                    return "onOff." + error;
                            }
                        }
                        return null;
                    };
    
                    /**
                     * Creates a FilterDescription message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof movies.filters.v1.FilterDescription
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {movies.filters.v1.FilterDescription} FilterDescription
                     */
                    FilterDescription.fromObject = function fromObject(object) {
                        if (object instanceof $root.movies.filters.v1.FilterDescription)
                            return object;
                        var message = new $root.movies.filters.v1.FilterDescription();
                        if (object.id != null) {
                            if (typeof object.id !== "object")
                                throw TypeError(".movies.filters.v1.FilterDescription.id: object expected");
                            message.id = $root.movies.filters.v1.DescriptionId.fromObject(object.id);
                        }
                        if (object.range != null) {
                            if (typeof object.range !== "object")
                                throw TypeError(".movies.filters.v1.FilterDescription.range: object expected");
                            message.range = $root.movies.filters.v1.RangeFilterDescription.fromObject(object.range);
                        }
                        if (object.tokens != null) {
                            if (typeof object.tokens !== "object")
                                throw TypeError(".movies.filters.v1.FilterDescription.tokens: object expected");
                            message.tokens = $root.movies.filters.v1.TokensFilterDescription.fromObject(object.tokens);
                        }
                        if (object.onOff != null) {
                            if (typeof object.onOff !== "object")
                                throw TypeError(".movies.filters.v1.FilterDescription.onOff: object expected");
                            message.onOff = $root.movies.filters.v1.OnOffFilterDescription.fromObject(object.onOff);
                        }
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a FilterDescription message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof movies.filters.v1.FilterDescription
                     * @static
                     * @param {movies.filters.v1.FilterDescription} message FilterDescription
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    FilterDescription.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.defaults)
                            object.id = null;
                        if (message.id != null && message.hasOwnProperty("id"))
                            object.id = $root.movies.filters.v1.DescriptionId.toObject(message.id, options);
                        if (message.range != null && message.hasOwnProperty("range")) {
                            object.range = $root.movies.filters.v1.RangeFilterDescription.toObject(message.range, options);
                            if (options.oneofs)
                                object.kind = "range";
                        }
                        if (message.tokens != null && message.hasOwnProperty("tokens")) {
                            object.tokens = $root.movies.filters.v1.TokensFilterDescription.toObject(message.tokens, options);
                            if (options.oneofs)
                                object.kind = "tokens";
                        }
                        if (message.onOff != null && message.hasOwnProperty("onOff")) {
                            object.onOff = $root.movies.filters.v1.OnOffFilterDescription.toObject(message.onOff, options);
                            if (options.oneofs)
                                object.kind = "onOff";
                        }
                        return object;
                    };
    
                    /**
                     * Converts this FilterDescription to JSON.
                     * @function toJSON
                     * @memberof movies.filters.v1.FilterDescription
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    FilterDescription.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    return FilterDescription;
                })();
    
                v1.SortDescription = (function() {
    
                    /**
                     * Properties of a SortDescription.
                     * @memberof movies.filters.v1
                     * @interface ISortDescription
                     * @property {movies.filters.v1.IDescriptionId|null} [id] SortDescription id
                     * @property {boolean|null} [ascByDefault] SortDescription ascByDefault
                     */
    
                    /**
                     * Constructs a new SortDescription.
                     * @memberof movies.filters.v1
                     * @classdesc Represents a SortDescription.
                     * @implements ISortDescription
                     * @constructor
                     * @param {movies.filters.v1.ISortDescription=} [properties] Properties to set
                     */
                    function SortDescription(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * SortDescription id.
                     * @member {movies.filters.v1.IDescriptionId|null|undefined} id
                     * @memberof movies.filters.v1.SortDescription
                     * @instance
                     */
                    SortDescription.prototype.id = null;
    
                    /**
                     * SortDescription ascByDefault.
                     * @member {boolean|null|undefined} ascByDefault
                     * @memberof movies.filters.v1.SortDescription
                     * @instance
                     */
                    SortDescription.prototype.ascByDefault = null;
    
                    // OneOf field names bound to virtual getters and setters
                    var $oneOfFields;
    
                    /**
                     * SortDescription _ascByDefault.
                     * @member {"ascByDefault"|undefined} _ascByDefault
                     * @memberof movies.filters.v1.SortDescription
                     * @instance
                     */
                    Object.defineProperty(SortDescription.prototype, "_ascByDefault", {
                        get: $util.oneOfGetter($oneOfFields = ["ascByDefault"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });
    
                    /**
                     * Creates a new SortDescription instance using the specified properties.
                     * @function create
                     * @memberof movies.filters.v1.SortDescription
                     * @static
                     * @param {movies.filters.v1.ISortDescription=} [properties] Properties to set
                     * @returns {movies.filters.v1.SortDescription} SortDescription instance
                     */
                    SortDescription.create = function create(properties) {
                        return new SortDescription(properties);
                    };
    
                    /**
                     * Encodes the specified SortDescription message. Does not implicitly {@link movies.filters.v1.SortDescription.verify|verify} messages.
                     * @function encode
                     * @memberof movies.filters.v1.SortDescription
                     * @static
                     * @param {movies.filters.v1.ISortDescription} message SortDescription message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    SortDescription.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                            $root.movies.filters.v1.DescriptionId.encode(message.id, writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                        if (message.ascByDefault != null && Object.hasOwnProperty.call(message, "ascByDefault"))
                            writer.uint32(/* id 2, wireType 0 =*/16).bool(message.ascByDefault);
                        return writer;
                    };
    
                    /**
                     * Encodes the specified SortDescription message, length delimited. Does not implicitly {@link movies.filters.v1.SortDescription.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof movies.filters.v1.SortDescription
                     * @static
                     * @param {movies.filters.v1.ISortDescription} message SortDescription message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    SortDescription.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a SortDescription message from the specified reader or buffer.
                     * @function decode
                     * @memberof movies.filters.v1.SortDescription
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {movies.filters.v1.SortDescription} SortDescription
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    SortDescription.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.movies.filters.v1.SortDescription();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.id = $root.movies.filters.v1.DescriptionId.decode(reader, reader.uint32());
                                break;
                            case 2:
                                message.ascByDefault = reader.bool();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes a SortDescription message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof movies.filters.v1.SortDescription
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {movies.filters.v1.SortDescription} SortDescription
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    SortDescription.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a SortDescription message.
                     * @function verify
                     * @memberof movies.filters.v1.SortDescription
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    SortDescription.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        var properties = {};
                        if (message.id != null && message.hasOwnProperty("id")) {
                            var error = $root.movies.filters.v1.DescriptionId.verify(message.id);
                            if (error)
                                return "id." + error;
                        }
                        if (message.ascByDefault != null && message.hasOwnProperty("ascByDefault")) {
                            properties._ascByDefault = 1;
                            if (typeof message.ascByDefault !== "boolean")
                                return "ascByDefault: boolean expected";
                        }
                        return null;
                    };
    
                    /**
                     * Creates a SortDescription message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof movies.filters.v1.SortDescription
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {movies.filters.v1.SortDescription} SortDescription
                     */
                    SortDescription.fromObject = function fromObject(object) {
                        if (object instanceof $root.movies.filters.v1.SortDescription)
                            return object;
                        var message = new $root.movies.filters.v1.SortDescription();
                        if (object.id != null) {
                            if (typeof object.id !== "object")
                                throw TypeError(".movies.filters.v1.SortDescription.id: object expected");
                            message.id = $root.movies.filters.v1.DescriptionId.fromObject(object.id);
                        }
                        if (object.ascByDefault != null)
                            message.ascByDefault = Boolean(object.ascByDefault);
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a SortDescription message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof movies.filters.v1.SortDescription
                     * @static
                     * @param {movies.filters.v1.SortDescription} message SortDescription
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    SortDescription.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.defaults)
                            object.id = null;
                        if (message.id != null && message.hasOwnProperty("id"))
                            object.id = $root.movies.filters.v1.DescriptionId.toObject(message.id, options);
                        if (message.ascByDefault != null && message.hasOwnProperty("ascByDefault")) {
                            object.ascByDefault = message.ascByDefault;
                            if (options.oneofs)
                                object._ascByDefault = "ascByDefault";
                        }
                        return object;
                    };
    
                    /**
                     * Converts this SortDescription to JSON.
                     * @function toJSON
                     * @memberof movies.filters.v1.SortDescription
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    SortDescription.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    return SortDescription;
                })();
    
                return v1;
            })();
    
            return filters;
        })();
    
        movies.info = (function() {
    
            /**
             * Namespace info.
             * @memberof movies
             * @namespace
             */
            var info = {};
    
            info.v1 = (function() {
    
                /**
                 * Namespace v1.
                 * @memberof movies.info
                 * @namespace
                 */
                var v1 = {};
    
                v1.MovieReference = (function() {
    
                    /**
                     * Properties of a MovieReference.
                     * @memberof movies.info.v1
                     * @interface IMovieReference
                     * @property {string|null} [id] MovieReference id
                     * @property {number|null} [pos] MovieReference pos
                     * @property {string|null} [title] MovieReference title
                     * @property {string|null} [cover] MovieReference cover
                     * @property {boolean|null} [hasVideo] MovieReference hasVideo
                     * @property {Array.<string>|null} [tags] MovieReference tags
                     * @property {Array.<string>|null} [ageRating] MovieReference ageRating
                     * @property {string|null} [sortHint] MovieReference sortHint
                     */
    
                    /**
                     * Constructs a new MovieReference.
                     * @memberof movies.info.v1
                     * @classdesc Represents a MovieReference.
                     * @implements IMovieReference
                     * @constructor
                     * @param {movies.info.v1.IMovieReference=} [properties] Properties to set
                     */
                    function MovieReference(properties) {
                        this.tags = [];
                        this.ageRating = [];
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * MovieReference id.
                     * @member {string} id
                     * @memberof movies.info.v1.MovieReference
                     * @instance
                     */
                    MovieReference.prototype.id = "";
    
                    /**
                     * MovieReference pos.
                     * @member {number|null|undefined} pos
                     * @memberof movies.info.v1.MovieReference
                     * @instance
                     */
                    MovieReference.prototype.pos = null;
    
                    /**
                     * MovieReference title.
                     * @member {string|null|undefined} title
                     * @memberof movies.info.v1.MovieReference
                     * @instance
                     */
                    MovieReference.prototype.title = null;
    
                    /**
                     * MovieReference cover.
                     * @member {string|null|undefined} cover
                     * @memberof movies.info.v1.MovieReference
                     * @instance
                     */
                    MovieReference.prototype.cover = null;
    
                    /**
                     * MovieReference hasVideo.
                     * @member {boolean|null|undefined} hasVideo
                     * @memberof movies.info.v1.MovieReference
                     * @instance
                     */
                    MovieReference.prototype.hasVideo = null;
    
                    /**
                     * MovieReference tags.
                     * @member {Array.<string>} tags
                     * @memberof movies.info.v1.MovieReference
                     * @instance
                     */
                    MovieReference.prototype.tags = $util.emptyArray;
    
                    /**
                     * MovieReference ageRating.
                     * @member {Array.<string>} ageRating
                     * @memberof movies.info.v1.MovieReference
                     * @instance
                     */
                    MovieReference.prototype.ageRating = $util.emptyArray;
    
                    /**
                     * MovieReference sortHint.
                     * @member {string} sortHint
                     * @memberof movies.info.v1.MovieReference
                     * @instance
                     */
                    MovieReference.prototype.sortHint = "";
    
                    // OneOf field names bound to virtual getters and setters
                    var $oneOfFields;
    
                    /**
                     * MovieReference _pos.
                     * @member {"pos"|undefined} _pos
                     * @memberof movies.info.v1.MovieReference
                     * @instance
                     */
                    Object.defineProperty(MovieReference.prototype, "_pos", {
                        get: $util.oneOfGetter($oneOfFields = ["pos"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });
    
                    /**
                     * MovieReference _title.
                     * @member {"title"|undefined} _title
                     * @memberof movies.info.v1.MovieReference
                     * @instance
                     */
                    Object.defineProperty(MovieReference.prototype, "_title", {
                        get: $util.oneOfGetter($oneOfFields = ["title"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });
    
                    /**
                     * MovieReference _cover.
                     * @member {"cover"|undefined} _cover
                     * @memberof movies.info.v1.MovieReference
                     * @instance
                     */
                    Object.defineProperty(MovieReference.prototype, "_cover", {
                        get: $util.oneOfGetter($oneOfFields = ["cover"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });
    
                    /**
                     * MovieReference _hasVideo.
                     * @member {"hasVideo"|undefined} _hasVideo
                     * @memberof movies.info.v1.MovieReference
                     * @instance
                     */
                    Object.defineProperty(MovieReference.prototype, "_hasVideo", {
                        get: $util.oneOfGetter($oneOfFields = ["hasVideo"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });
    
                    /**
                     * Creates a new MovieReference instance using the specified properties.
                     * @function create
                     * @memberof movies.info.v1.MovieReference
                     * @static
                     * @param {movies.info.v1.IMovieReference=} [properties] Properties to set
                     * @returns {movies.info.v1.MovieReference} MovieReference instance
                     */
                    MovieReference.create = function create(properties) {
                        return new MovieReference(properties);
                    };
    
                    /**
                     * Encodes the specified MovieReference message. Does not implicitly {@link movies.info.v1.MovieReference.verify|verify} messages.
                     * @function encode
                     * @memberof movies.info.v1.MovieReference
                     * @static
                     * @param {movies.info.v1.IMovieReference} message MovieReference message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    MovieReference.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                            writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                        if (message.pos != null && Object.hasOwnProperty.call(message, "pos"))
                            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.pos);
                        if (message.title != null && Object.hasOwnProperty.call(message, "title"))
                            writer.uint32(/* id 3, wireType 2 =*/26).string(message.title);
                        if (message.cover != null && Object.hasOwnProperty.call(message, "cover"))
                            writer.uint32(/* id 4, wireType 2 =*/34).string(message.cover);
                        if (message.hasVideo != null && Object.hasOwnProperty.call(message, "hasVideo"))
                            writer.uint32(/* id 5, wireType 0 =*/40).bool(message.hasVideo);
                        if (message.tags != null && message.tags.length)
                            for (var i = 0; i < message.tags.length; ++i)
                                writer.uint32(/* id 6, wireType 2 =*/50).string(message.tags[i]);
                        if (message.ageRating != null && message.ageRating.length)
                            for (var i = 0; i < message.ageRating.length; ++i)
                                writer.uint32(/* id 7, wireType 2 =*/58).string(message.ageRating[i]);
                        if (message.sortHint != null && Object.hasOwnProperty.call(message, "sortHint"))
                            writer.uint32(/* id 8, wireType 2 =*/66).string(message.sortHint);
                        return writer;
                    };
    
                    /**
                     * Encodes the specified MovieReference message, length delimited. Does not implicitly {@link movies.info.v1.MovieReference.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof movies.info.v1.MovieReference
                     * @static
                     * @param {movies.info.v1.IMovieReference} message MovieReference message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    MovieReference.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a MovieReference message from the specified reader or buffer.
                     * @function decode
                     * @memberof movies.info.v1.MovieReference
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {movies.info.v1.MovieReference} MovieReference
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    MovieReference.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.movies.info.v1.MovieReference();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.id = reader.string();
                                break;
                            case 2:
                                message.pos = reader.uint32();
                                break;
                            case 3:
                                message.title = reader.string();
                                break;
                            case 4:
                                message.cover = reader.string();
                                break;
                            case 5:
                                message.hasVideo = reader.bool();
                                break;
                            case 6:
                                if (!(message.tags && message.tags.length))
                                    message.tags = [];
                                message.tags.push(reader.string());
                                break;
                            case 7:
                                if (!(message.ageRating && message.ageRating.length))
                                    message.ageRating = [];
                                message.ageRating.push(reader.string());
                                break;
                            case 8:
                                message.sortHint = reader.string();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes a MovieReference message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof movies.info.v1.MovieReference
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {movies.info.v1.MovieReference} MovieReference
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    MovieReference.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a MovieReference message.
                     * @function verify
                     * @memberof movies.info.v1.MovieReference
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    MovieReference.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        var properties = {};
                        if (message.id != null && message.hasOwnProperty("id"))
                            if (!$util.isString(message.id))
                                return "id: string expected";
                        if (message.pos != null && message.hasOwnProperty("pos")) {
                            properties._pos = 1;
                            if (!$util.isInteger(message.pos))
                                return "pos: integer expected";
                        }
                        if (message.title != null && message.hasOwnProperty("title")) {
                            properties._title = 1;
                            if (!$util.isString(message.title))
                                return "title: string expected";
                        }
                        if (message.cover != null && message.hasOwnProperty("cover")) {
                            properties._cover = 1;
                            if (!$util.isString(message.cover))
                                return "cover: string expected";
                        }
                        if (message.hasVideo != null && message.hasOwnProperty("hasVideo")) {
                            properties._hasVideo = 1;
                            if (typeof message.hasVideo !== "boolean")
                                return "hasVideo: boolean expected";
                        }
                        if (message.tags != null && message.hasOwnProperty("tags")) {
                            if (!Array.isArray(message.tags))
                                return "tags: array expected";
                            for (var i = 0; i < message.tags.length; ++i)
                                if (!$util.isString(message.tags[i]))
                                    return "tags: string[] expected";
                        }
                        if (message.ageRating != null && message.hasOwnProperty("ageRating")) {
                            if (!Array.isArray(message.ageRating))
                                return "ageRating: array expected";
                            for (var i = 0; i < message.ageRating.length; ++i)
                                if (!$util.isString(message.ageRating[i]))
                                    return "ageRating: string[] expected";
                        }
                        if (message.sortHint != null && message.hasOwnProperty("sortHint"))
                            if (!$util.isString(message.sortHint))
                                return "sortHint: string expected";
                        return null;
                    };
    
                    /**
                     * Creates a MovieReference message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof movies.info.v1.MovieReference
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {movies.info.v1.MovieReference} MovieReference
                     */
                    MovieReference.fromObject = function fromObject(object) {
                        if (object instanceof $root.movies.info.v1.MovieReference)
                            return object;
                        var message = new $root.movies.info.v1.MovieReference();
                        if (object.id != null)
                            message.id = String(object.id);
                        if (object.pos != null)
                            message.pos = object.pos >>> 0;
                        if (object.title != null)
                            message.title = String(object.title);
                        if (object.cover != null)
                            message.cover = String(object.cover);
                        if (object.hasVideo != null)
                            message.hasVideo = Boolean(object.hasVideo);
                        if (object.tags) {
                            if (!Array.isArray(object.tags))
                                throw TypeError(".movies.info.v1.MovieReference.tags: array expected");
                            message.tags = [];
                            for (var i = 0; i < object.tags.length; ++i)
                                message.tags[i] = String(object.tags[i]);
                        }
                        if (object.ageRating) {
                            if (!Array.isArray(object.ageRating))
                                throw TypeError(".movies.info.v1.MovieReference.ageRating: array expected");
                            message.ageRating = [];
                            for (var i = 0; i < object.ageRating.length; ++i)
                                message.ageRating[i] = String(object.ageRating[i]);
                        }
                        if (object.sortHint != null)
                            message.sortHint = String(object.sortHint);
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a MovieReference message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof movies.info.v1.MovieReference
                     * @static
                     * @param {movies.info.v1.MovieReference} message MovieReference
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    MovieReference.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.arrays || options.defaults) {
                            object.tags = [];
                            object.ageRating = [];
                        }
                        if (options.defaults) {
                            object.id = "";
                            object.sortHint = "";
                        }
                        if (message.id != null && message.hasOwnProperty("id"))
                            object.id = message.id;
                        if (message.pos != null && message.hasOwnProperty("pos")) {
                            object.pos = message.pos;
                            if (options.oneofs)
                                object._pos = "pos";
                        }
                        if (message.title != null && message.hasOwnProperty("title")) {
                            object.title = message.title;
                            if (options.oneofs)
                                object._title = "title";
                        }
                        if (message.cover != null && message.hasOwnProperty("cover")) {
                            object.cover = message.cover;
                            if (options.oneofs)
                                object._cover = "cover";
                        }
                        if (message.hasVideo != null && message.hasOwnProperty("hasVideo")) {
                            object.hasVideo = message.hasVideo;
                            if (options.oneofs)
                                object._hasVideo = "hasVideo";
                        }
                        if (message.tags && message.tags.length) {
                            object.tags = [];
                            for (var j = 0; j < message.tags.length; ++j)
                                object.tags[j] = message.tags[j];
                        }
                        if (message.ageRating && message.ageRating.length) {
                            object.ageRating = [];
                            for (var j = 0; j < message.ageRating.length; ++j)
                                object.ageRating[j] = message.ageRating[j];
                        }
                        if (message.sortHint != null && message.hasOwnProperty("sortHint"))
                            object.sortHint = message.sortHint;
                        return object;
                    };
    
                    /**
                     * Converts this MovieReference to JSON.
                     * @function toJSON
                     * @memberof movies.info.v1.MovieReference
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    MovieReference.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    return MovieReference;
                })();
    
                v1.MovieGroup = (function() {
    
                    /**
                     * Properties of a MovieGroup.
                     * @memberof movies.info.v1
                     * @interface IMovieGroup
                     * @property {string|null} [id] MovieGroup id
                     * @property {string|null} [title] MovieGroup title
                     * @property {Array.<movies.info.v1.IMovieReference>|null} [items] MovieGroup items
                     * @property {number|null} [pos] MovieGroup pos
                     */
    
                    /**
                     * Constructs a new MovieGroup.
                     * @memberof movies.info.v1
                     * @classdesc Represents a MovieGroup.
                     * @implements IMovieGroup
                     * @constructor
                     * @param {movies.info.v1.IMovieGroup=} [properties] Properties to set
                     */
                    function MovieGroup(properties) {
                        this.items = [];
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * MovieGroup id.
                     * @member {string} id
                     * @memberof movies.info.v1.MovieGroup
                     * @instance
                     */
                    MovieGroup.prototype.id = "";
    
                    /**
                     * MovieGroup title.
                     * @member {string|null|undefined} title
                     * @memberof movies.info.v1.MovieGroup
                     * @instance
                     */
                    MovieGroup.prototype.title = null;
    
                    /**
                     * MovieGroup items.
                     * @member {Array.<movies.info.v1.IMovieReference>} items
                     * @memberof movies.info.v1.MovieGroup
                     * @instance
                     */
                    MovieGroup.prototype.items = $util.emptyArray;
    
                    /**
                     * MovieGroup pos.
                     * @member {number|null|undefined} pos
                     * @memberof movies.info.v1.MovieGroup
                     * @instance
                     */
                    MovieGroup.prototype.pos = null;
    
                    // OneOf field names bound to virtual getters and setters
                    var $oneOfFields;
    
                    /**
                     * MovieGroup _title.
                     * @member {"title"|undefined} _title
                     * @memberof movies.info.v1.MovieGroup
                     * @instance
                     */
                    Object.defineProperty(MovieGroup.prototype, "_title", {
                        get: $util.oneOfGetter($oneOfFields = ["title"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });
    
                    /**
                     * MovieGroup _pos.
                     * @member {"pos"|undefined} _pos
                     * @memberof movies.info.v1.MovieGroup
                     * @instance
                     */
                    Object.defineProperty(MovieGroup.prototype, "_pos", {
                        get: $util.oneOfGetter($oneOfFields = ["pos"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });
    
                    /**
                     * Creates a new MovieGroup instance using the specified properties.
                     * @function create
                     * @memberof movies.info.v1.MovieGroup
                     * @static
                     * @param {movies.info.v1.IMovieGroup=} [properties] Properties to set
                     * @returns {movies.info.v1.MovieGroup} MovieGroup instance
                     */
                    MovieGroup.create = function create(properties) {
                        return new MovieGroup(properties);
                    };
    
                    /**
                     * Encodes the specified MovieGroup message. Does not implicitly {@link movies.info.v1.MovieGroup.verify|verify} messages.
                     * @function encode
                     * @memberof movies.info.v1.MovieGroup
                     * @static
                     * @param {movies.info.v1.IMovieGroup} message MovieGroup message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    MovieGroup.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                            writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                        if (message.title != null && Object.hasOwnProperty.call(message, "title"))
                            writer.uint32(/* id 2, wireType 2 =*/18).string(message.title);
                        if (message.items != null && message.items.length)
                            for (var i = 0; i < message.items.length; ++i)
                                $root.movies.info.v1.MovieReference.encode(message.items[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                        if (message.pos != null && Object.hasOwnProperty.call(message, "pos"))
                            writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.pos);
                        return writer;
                    };
    
                    /**
                     * Encodes the specified MovieGroup message, length delimited. Does not implicitly {@link movies.info.v1.MovieGroup.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof movies.info.v1.MovieGroup
                     * @static
                     * @param {movies.info.v1.IMovieGroup} message MovieGroup message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    MovieGroup.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a MovieGroup message from the specified reader or buffer.
                     * @function decode
                     * @memberof movies.info.v1.MovieGroup
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {movies.info.v1.MovieGroup} MovieGroup
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    MovieGroup.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.movies.info.v1.MovieGroup();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.id = reader.string();
                                break;
                            case 2:
                                message.title = reader.string();
                                break;
                            case 3:
                                if (!(message.items && message.items.length))
                                    message.items = [];
                                message.items.push($root.movies.info.v1.MovieReference.decode(reader, reader.uint32()));
                                break;
                            case 4:
                                message.pos = reader.uint32();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes a MovieGroup message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof movies.info.v1.MovieGroup
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {movies.info.v1.MovieGroup} MovieGroup
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    MovieGroup.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a MovieGroup message.
                     * @function verify
                     * @memberof movies.info.v1.MovieGroup
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    MovieGroup.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        var properties = {};
                        if (message.id != null && message.hasOwnProperty("id"))
                            if (!$util.isString(message.id))
                                return "id: string expected";
                        if (message.title != null && message.hasOwnProperty("title")) {
                            properties._title = 1;
                            if (!$util.isString(message.title))
                                return "title: string expected";
                        }
                        if (message.items != null && message.hasOwnProperty("items")) {
                            if (!Array.isArray(message.items))
                                return "items: array expected";
                            for (var i = 0; i < message.items.length; ++i) {
                                var error = $root.movies.info.v1.MovieReference.verify(message.items[i]);
                                if (error)
                                    return "items." + error;
                            }
                        }
                        if (message.pos != null && message.hasOwnProperty("pos")) {
                            properties._pos = 1;
                            if (!$util.isInteger(message.pos))
                                return "pos: integer expected";
                        }
                        return null;
                    };
    
                    /**
                     * Creates a MovieGroup message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof movies.info.v1.MovieGroup
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {movies.info.v1.MovieGroup} MovieGroup
                     */
                    MovieGroup.fromObject = function fromObject(object) {
                        if (object instanceof $root.movies.info.v1.MovieGroup)
                            return object;
                        var message = new $root.movies.info.v1.MovieGroup();
                        if (object.id != null)
                            message.id = String(object.id);
                        if (object.title != null)
                            message.title = String(object.title);
                        if (object.items) {
                            if (!Array.isArray(object.items))
                                throw TypeError(".movies.info.v1.MovieGroup.items: array expected");
                            message.items = [];
                            for (var i = 0; i < object.items.length; ++i) {
                                if (typeof object.items[i] !== "object")
                                    throw TypeError(".movies.info.v1.MovieGroup.items: object expected");
                                message.items[i] = $root.movies.info.v1.MovieReference.fromObject(object.items[i]);
                            }
                        }
                        if (object.pos != null)
                            message.pos = object.pos >>> 0;
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a MovieGroup message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof movies.info.v1.MovieGroup
                     * @static
                     * @param {movies.info.v1.MovieGroup} message MovieGroup
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    MovieGroup.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.arrays || options.defaults)
                            object.items = [];
                        if (options.defaults)
                            object.id = "";
                        if (message.id != null && message.hasOwnProperty("id"))
                            object.id = message.id;
                        if (message.title != null && message.hasOwnProperty("title")) {
                            object.title = message.title;
                            if (options.oneofs)
                                object._title = "title";
                        }
                        if (message.items && message.items.length) {
                            object.items = [];
                            for (var j = 0; j < message.items.length; ++j)
                                object.items[j] = $root.movies.info.v1.MovieReference.toObject(message.items[j], options);
                        }
                        if (message.pos != null && message.hasOwnProperty("pos")) {
                            object.pos = message.pos;
                            if (options.oneofs)
                                object._pos = "pos";
                        }
                        return object;
                    };
    
                    /**
                     * Converts this MovieGroup to JSON.
                     * @function toJSON
                     * @memberof movies.info.v1.MovieGroup
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    MovieGroup.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    return MovieGroup;
                })();
    
                v1.MovieInfo = (function() {
    
                    /**
                     * Properties of a MovieInfo.
                     * @memberof movies.info.v1
                     * @interface IMovieInfo
                     * @property {string|null} [id] MovieInfo id
                     * @property {boolean|null} [hasVideo] MovieInfo hasVideo
                     * @property {movies.info.v1.ITitleInfo|null} [title] MovieInfo title
                     * @property {movies.info.v1.ICrewInfo|null} [crew] MovieInfo crew
                     * @property {Array.<movies.info.v1.IPeopleMap>|null} [people] MovieInfo people
                     * @property {Array.<movies.info.v1.ILink>|null} [links] MovieInfo links
                     * @property {Array.<string>|null} [genres] MovieInfo genres
                     * @property {Array.<string>|null} [countries] MovieInfo countries
                     * @property {Array.<string>|null} [ageRating] MovieInfo ageRating
                     * @property {Array.<string>|null} [tags] MovieInfo tags
                     * @property {Array.<movies.info.v1.IMovieReference>|null} [episodes] MovieInfo episodes
                     * @property {string|null} [summary] MovieInfo summary
                     * @property {movies.info.v1.IImageInfo|null} [image] MovieInfo image
                     * @property {number|null} [year] MovieInfo year
                     * @property {number|null} [runtime] MovieInfo runtime
                     * @property {number|null} [rating] MovieInfo rating
                     */
    
                    /**
                     * Constructs a new MovieInfo.
                     * @memberof movies.info.v1
                     * @classdesc Represents a MovieInfo.
                     * @implements IMovieInfo
                     * @constructor
                     * @param {movies.info.v1.IMovieInfo=} [properties] Properties to set
                     */
                    function MovieInfo(properties) {
                        this.people = [];
                        this.links = [];
                        this.genres = [];
                        this.countries = [];
                        this.ageRating = [];
                        this.tags = [];
                        this.episodes = [];
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * MovieInfo id.
                     * @member {string} id
                     * @memberof movies.info.v1.MovieInfo
                     * @instance
                     */
                    MovieInfo.prototype.id = "";
    
                    /**
                     * MovieInfo hasVideo.
                     * @member {boolean} hasVideo
                     * @memberof movies.info.v1.MovieInfo
                     * @instance
                     */
                    MovieInfo.prototype.hasVideo = false;
    
                    /**
                     * MovieInfo title.
                     * @member {movies.info.v1.ITitleInfo|null|undefined} title
                     * @memberof movies.info.v1.MovieInfo
                     * @instance
                     */
                    MovieInfo.prototype.title = null;
    
                    /**
                     * MovieInfo crew.
                     * @member {movies.info.v1.ICrewInfo|null|undefined} crew
                     * @memberof movies.info.v1.MovieInfo
                     * @instance
                     */
                    MovieInfo.prototype.crew = null;
    
                    /**
                     * MovieInfo people.
                     * @member {Array.<movies.info.v1.IPeopleMap>} people
                     * @memberof movies.info.v1.MovieInfo
                     * @instance
                     */
                    MovieInfo.prototype.people = $util.emptyArray;
    
                    /**
                     * MovieInfo links.
                     * @member {Array.<movies.info.v1.ILink>} links
                     * @memberof movies.info.v1.MovieInfo
                     * @instance
                     */
                    MovieInfo.prototype.links = $util.emptyArray;
    
                    /**
                     * MovieInfo genres.
                     * @member {Array.<string>} genres
                     * @memberof movies.info.v1.MovieInfo
                     * @instance
                     */
                    MovieInfo.prototype.genres = $util.emptyArray;
    
                    /**
                     * MovieInfo countries.
                     * @member {Array.<string>} countries
                     * @memberof movies.info.v1.MovieInfo
                     * @instance
                     */
                    MovieInfo.prototype.countries = $util.emptyArray;
    
                    /**
                     * MovieInfo ageRating.
                     * @member {Array.<string>} ageRating
                     * @memberof movies.info.v1.MovieInfo
                     * @instance
                     */
                    MovieInfo.prototype.ageRating = $util.emptyArray;
    
                    /**
                     * MovieInfo tags.
                     * @member {Array.<string>} tags
                     * @memberof movies.info.v1.MovieInfo
                     * @instance
                     */
                    MovieInfo.prototype.tags = $util.emptyArray;
    
                    /**
                     * MovieInfo episodes.
                     * @member {Array.<movies.info.v1.IMovieReference>} episodes
                     * @memberof movies.info.v1.MovieInfo
                     * @instance
                     */
                    MovieInfo.prototype.episodes = $util.emptyArray;
    
                    /**
                     * MovieInfo summary.
                     * @member {string|null|undefined} summary
                     * @memberof movies.info.v1.MovieInfo
                     * @instance
                     */
                    MovieInfo.prototype.summary = null;
    
                    /**
                     * MovieInfo image.
                     * @member {movies.info.v1.IImageInfo|null|undefined} image
                     * @memberof movies.info.v1.MovieInfo
                     * @instance
                     */
                    MovieInfo.prototype.image = null;
    
                    /**
                     * MovieInfo year.
                     * @member {number|null|undefined} year
                     * @memberof movies.info.v1.MovieInfo
                     * @instance
                     */
                    MovieInfo.prototype.year = null;
    
                    /**
                     * MovieInfo runtime.
                     * @member {number|null|undefined} runtime
                     * @memberof movies.info.v1.MovieInfo
                     * @instance
                     */
                    MovieInfo.prototype.runtime = null;
    
                    /**
                     * MovieInfo rating.
                     * @member {number|null|undefined} rating
                     * @memberof movies.info.v1.MovieInfo
                     * @instance
                     */
                    MovieInfo.prototype.rating = null;
    
                    // OneOf field names bound to virtual getters and setters
                    var $oneOfFields;
    
                    /**
                     * MovieInfo _summary.
                     * @member {"summary"|undefined} _summary
                     * @memberof movies.info.v1.MovieInfo
                     * @instance
                     */
                    Object.defineProperty(MovieInfo.prototype, "_summary", {
                        get: $util.oneOfGetter($oneOfFields = ["summary"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });
    
                    /**
                     * MovieInfo _year.
                     * @member {"year"|undefined} _year
                     * @memberof movies.info.v1.MovieInfo
                     * @instance
                     */
                    Object.defineProperty(MovieInfo.prototype, "_year", {
                        get: $util.oneOfGetter($oneOfFields = ["year"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });
    
                    /**
                     * MovieInfo _runtime.
                     * @member {"runtime"|undefined} _runtime
                     * @memberof movies.info.v1.MovieInfo
                     * @instance
                     */
                    Object.defineProperty(MovieInfo.prototype, "_runtime", {
                        get: $util.oneOfGetter($oneOfFields = ["runtime"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });
    
                    /**
                     * MovieInfo _rating.
                     * @member {"rating"|undefined} _rating
                     * @memberof movies.info.v1.MovieInfo
                     * @instance
                     */
                    Object.defineProperty(MovieInfo.prototype, "_rating", {
                        get: $util.oneOfGetter($oneOfFields = ["rating"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });
    
                    /**
                     * Creates a new MovieInfo instance using the specified properties.
                     * @function create
                     * @memberof movies.info.v1.MovieInfo
                     * @static
                     * @param {movies.info.v1.IMovieInfo=} [properties] Properties to set
                     * @returns {movies.info.v1.MovieInfo} MovieInfo instance
                     */
                    MovieInfo.create = function create(properties) {
                        return new MovieInfo(properties);
                    };
    
                    /**
                     * Encodes the specified MovieInfo message. Does not implicitly {@link movies.info.v1.MovieInfo.verify|verify} messages.
                     * @function encode
                     * @memberof movies.info.v1.MovieInfo
                     * @static
                     * @param {movies.info.v1.IMovieInfo} message MovieInfo message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    MovieInfo.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                            writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                        if (message.hasVideo != null && Object.hasOwnProperty.call(message, "hasVideo"))
                            writer.uint32(/* id 2, wireType 0 =*/16).bool(message.hasVideo);
                        if (message.title != null && Object.hasOwnProperty.call(message, "title"))
                            $root.movies.info.v1.TitleInfo.encode(message.title, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                        if (message.crew != null && Object.hasOwnProperty.call(message, "crew"))
                            $root.movies.info.v1.CrewInfo.encode(message.crew, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                        if (message.people != null && message.people.length)
                            for (var i = 0; i < message.people.length; ++i)
                                $root.movies.info.v1.PeopleMap.encode(message.people[i], writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                        if (message.links != null && message.links.length)
                            for (var i = 0; i < message.links.length; ++i)
                                $root.movies.info.v1.Link.encode(message.links[i], writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                        if (message.genres != null && message.genres.length)
                            for (var i = 0; i < message.genres.length; ++i)
                                writer.uint32(/* id 7, wireType 2 =*/58).string(message.genres[i]);
                        if (message.countries != null && message.countries.length)
                            for (var i = 0; i < message.countries.length; ++i)
                                writer.uint32(/* id 8, wireType 2 =*/66).string(message.countries[i]);
                        if (message.ageRating != null && message.ageRating.length)
                            for (var i = 0; i < message.ageRating.length; ++i)
                                writer.uint32(/* id 9, wireType 2 =*/74).string(message.ageRating[i]);
                        if (message.tags != null && message.tags.length)
                            for (var i = 0; i < message.tags.length; ++i)
                                writer.uint32(/* id 10, wireType 2 =*/82).string(message.tags[i]);
                        if (message.episodes != null && message.episodes.length)
                            for (var i = 0; i < message.episodes.length; ++i)
                                $root.movies.info.v1.MovieReference.encode(message.episodes[i], writer.uint32(/* id 11, wireType 2 =*/90).fork()).ldelim();
                        if (message.summary != null && Object.hasOwnProperty.call(message, "summary"))
                            writer.uint32(/* id 12, wireType 2 =*/98).string(message.summary);
                        if (message.image != null && Object.hasOwnProperty.call(message, "image"))
                            $root.movies.info.v1.ImageInfo.encode(message.image, writer.uint32(/* id 13, wireType 2 =*/106).fork()).ldelim();
                        if (message.year != null && Object.hasOwnProperty.call(message, "year"))
                            writer.uint32(/* id 14, wireType 0 =*/112).uint32(message.year);
                        if (message.runtime != null && Object.hasOwnProperty.call(message, "runtime"))
                            writer.uint32(/* id 15, wireType 0 =*/120).uint32(message.runtime);
                        if (message.rating != null && Object.hasOwnProperty.call(message, "rating"))
                            writer.uint32(/* id 16, wireType 0 =*/128).uint32(message.rating);
                        return writer;
                    };
    
                    /**
                     * Encodes the specified MovieInfo message, length delimited. Does not implicitly {@link movies.info.v1.MovieInfo.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof movies.info.v1.MovieInfo
                     * @static
                     * @param {movies.info.v1.IMovieInfo} message MovieInfo message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    MovieInfo.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a MovieInfo message from the specified reader or buffer.
                     * @function decode
                     * @memberof movies.info.v1.MovieInfo
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {movies.info.v1.MovieInfo} MovieInfo
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    MovieInfo.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.movies.info.v1.MovieInfo();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.id = reader.string();
                                break;
                            case 2:
                                message.hasVideo = reader.bool();
                                break;
                            case 3:
                                message.title = $root.movies.info.v1.TitleInfo.decode(reader, reader.uint32());
                                break;
                            case 4:
                                message.crew = $root.movies.info.v1.CrewInfo.decode(reader, reader.uint32());
                                break;
                            case 5:
                                if (!(message.people && message.people.length))
                                    message.people = [];
                                message.people.push($root.movies.info.v1.PeopleMap.decode(reader, reader.uint32()));
                                break;
                            case 6:
                                if (!(message.links && message.links.length))
                                    message.links = [];
                                message.links.push($root.movies.info.v1.Link.decode(reader, reader.uint32()));
                                break;
                            case 7:
                                if (!(message.genres && message.genres.length))
                                    message.genres = [];
                                message.genres.push(reader.string());
                                break;
                            case 8:
                                if (!(message.countries && message.countries.length))
                                    message.countries = [];
                                message.countries.push(reader.string());
                                break;
                            case 9:
                                if (!(message.ageRating && message.ageRating.length))
                                    message.ageRating = [];
                                message.ageRating.push(reader.string());
                                break;
                            case 10:
                                if (!(message.tags && message.tags.length))
                                    message.tags = [];
                                message.tags.push(reader.string());
                                break;
                            case 11:
                                if (!(message.episodes && message.episodes.length))
                                    message.episodes = [];
                                message.episodes.push($root.movies.info.v1.MovieReference.decode(reader, reader.uint32()));
                                break;
                            case 12:
                                message.summary = reader.string();
                                break;
                            case 13:
                                message.image = $root.movies.info.v1.ImageInfo.decode(reader, reader.uint32());
                                break;
                            case 14:
                                message.year = reader.uint32();
                                break;
                            case 15:
                                message.runtime = reader.uint32();
                                break;
                            case 16:
                                message.rating = reader.uint32();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes a MovieInfo message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof movies.info.v1.MovieInfo
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {movies.info.v1.MovieInfo} MovieInfo
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    MovieInfo.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a MovieInfo message.
                     * @function verify
                     * @memberof movies.info.v1.MovieInfo
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    MovieInfo.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        var properties = {};
                        if (message.id != null && message.hasOwnProperty("id"))
                            if (!$util.isString(message.id))
                                return "id: string expected";
                        if (message.hasVideo != null && message.hasOwnProperty("hasVideo"))
                            if (typeof message.hasVideo !== "boolean")
                                return "hasVideo: boolean expected";
                        if (message.title != null && message.hasOwnProperty("title")) {
                            var error = $root.movies.info.v1.TitleInfo.verify(message.title);
                            if (error)
                                return "title." + error;
                        }
                        if (message.crew != null && message.hasOwnProperty("crew")) {
                            var error = $root.movies.info.v1.CrewInfo.verify(message.crew);
                            if (error)
                                return "crew." + error;
                        }
                        if (message.people != null && message.hasOwnProperty("people")) {
                            if (!Array.isArray(message.people))
                                return "people: array expected";
                            for (var i = 0; i < message.people.length; ++i) {
                                var error = $root.movies.info.v1.PeopleMap.verify(message.people[i]);
                                if (error)
                                    return "people." + error;
                            }
                        }
                        if (message.links != null && message.hasOwnProperty("links")) {
                            if (!Array.isArray(message.links))
                                return "links: array expected";
                            for (var i = 0; i < message.links.length; ++i) {
                                var error = $root.movies.info.v1.Link.verify(message.links[i]);
                                if (error)
                                    return "links." + error;
                            }
                        }
                        if (message.genres != null && message.hasOwnProperty("genres")) {
                            if (!Array.isArray(message.genres))
                                return "genres: array expected";
                            for (var i = 0; i < message.genres.length; ++i)
                                if (!$util.isString(message.genres[i]))
                                    return "genres: string[] expected";
                        }
                        if (message.countries != null && message.hasOwnProperty("countries")) {
                            if (!Array.isArray(message.countries))
                                return "countries: array expected";
                            for (var i = 0; i < message.countries.length; ++i)
                                if (!$util.isString(message.countries[i]))
                                    return "countries: string[] expected";
                        }
                        if (message.ageRating != null && message.hasOwnProperty("ageRating")) {
                            if (!Array.isArray(message.ageRating))
                                return "ageRating: array expected";
                            for (var i = 0; i < message.ageRating.length; ++i)
                                if (!$util.isString(message.ageRating[i]))
                                    return "ageRating: string[] expected";
                        }
                        if (message.tags != null && message.hasOwnProperty("tags")) {
                            if (!Array.isArray(message.tags))
                                return "tags: array expected";
                            for (var i = 0; i < message.tags.length; ++i)
                                if (!$util.isString(message.tags[i]))
                                    return "tags: string[] expected";
                        }
                        if (message.episodes != null && message.hasOwnProperty("episodes")) {
                            if (!Array.isArray(message.episodes))
                                return "episodes: array expected";
                            for (var i = 0; i < message.episodes.length; ++i) {
                                var error = $root.movies.info.v1.MovieReference.verify(message.episodes[i]);
                                if (error)
                                    return "episodes." + error;
                            }
                        }
                        if (message.summary != null && message.hasOwnProperty("summary")) {
                            properties._summary = 1;
                            if (!$util.isString(message.summary))
                                return "summary: string expected";
                        }
                        if (message.image != null && message.hasOwnProperty("image")) {
                            var error = $root.movies.info.v1.ImageInfo.verify(message.image);
                            if (error)
                                return "image." + error;
                        }
                        if (message.year != null && message.hasOwnProperty("year")) {
                            properties._year = 1;
                            if (!$util.isInteger(message.year))
                                return "year: integer expected";
                        }
                        if (message.runtime != null && message.hasOwnProperty("runtime")) {
                            properties._runtime = 1;
                            if (!$util.isInteger(message.runtime))
                                return "runtime: integer expected";
                        }
                        if (message.rating != null && message.hasOwnProperty("rating")) {
                            properties._rating = 1;
                            if (!$util.isInteger(message.rating))
                                return "rating: integer expected";
                        }
                        return null;
                    };
    
                    /**
                     * Creates a MovieInfo message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof movies.info.v1.MovieInfo
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {movies.info.v1.MovieInfo} MovieInfo
                     */
                    MovieInfo.fromObject = function fromObject(object) {
                        if (object instanceof $root.movies.info.v1.MovieInfo)
                            return object;
                        var message = new $root.movies.info.v1.MovieInfo();
                        if (object.id != null)
                            message.id = String(object.id);
                        if (object.hasVideo != null)
                            message.hasVideo = Boolean(object.hasVideo);
                        if (object.title != null) {
                            if (typeof object.title !== "object")
                                throw TypeError(".movies.info.v1.MovieInfo.title: object expected");
                            message.title = $root.movies.info.v1.TitleInfo.fromObject(object.title);
                        }
                        if (object.crew != null) {
                            if (typeof object.crew !== "object")
                                throw TypeError(".movies.info.v1.MovieInfo.crew: object expected");
                            message.crew = $root.movies.info.v1.CrewInfo.fromObject(object.crew);
                        }
                        if (object.people) {
                            if (!Array.isArray(object.people))
                                throw TypeError(".movies.info.v1.MovieInfo.people: array expected");
                            message.people = [];
                            for (var i = 0; i < object.people.length; ++i) {
                                if (typeof object.people[i] !== "object")
                                    throw TypeError(".movies.info.v1.MovieInfo.people: object expected");
                                message.people[i] = $root.movies.info.v1.PeopleMap.fromObject(object.people[i]);
                            }
                        }
                        if (object.links) {
                            if (!Array.isArray(object.links))
                                throw TypeError(".movies.info.v1.MovieInfo.links: array expected");
                            message.links = [];
                            for (var i = 0; i < object.links.length; ++i) {
                                if (typeof object.links[i] !== "object")
                                    throw TypeError(".movies.info.v1.MovieInfo.links: object expected");
                                message.links[i] = $root.movies.info.v1.Link.fromObject(object.links[i]);
                            }
                        }
                        if (object.genres) {
                            if (!Array.isArray(object.genres))
                                throw TypeError(".movies.info.v1.MovieInfo.genres: array expected");
                            message.genres = [];
                            for (var i = 0; i < object.genres.length; ++i)
                                message.genres[i] = String(object.genres[i]);
                        }
                        if (object.countries) {
                            if (!Array.isArray(object.countries))
                                throw TypeError(".movies.info.v1.MovieInfo.countries: array expected");
                            message.countries = [];
                            for (var i = 0; i < object.countries.length; ++i)
                                message.countries[i] = String(object.countries[i]);
                        }
                        if (object.ageRating) {
                            if (!Array.isArray(object.ageRating))
                                throw TypeError(".movies.info.v1.MovieInfo.ageRating: array expected");
                            message.ageRating = [];
                            for (var i = 0; i < object.ageRating.length; ++i)
                                message.ageRating[i] = String(object.ageRating[i]);
                        }
                        if (object.tags) {
                            if (!Array.isArray(object.tags))
                                throw TypeError(".movies.info.v1.MovieInfo.tags: array expected");
                            message.tags = [];
                            for (var i = 0; i < object.tags.length; ++i)
                                message.tags[i] = String(object.tags[i]);
                        }
                        if (object.episodes) {
                            if (!Array.isArray(object.episodes))
                                throw TypeError(".movies.info.v1.MovieInfo.episodes: array expected");
                            message.episodes = [];
                            for (var i = 0; i < object.episodes.length; ++i) {
                                if (typeof object.episodes[i] !== "object")
                                    throw TypeError(".movies.info.v1.MovieInfo.episodes: object expected");
                                message.episodes[i] = $root.movies.info.v1.MovieReference.fromObject(object.episodes[i]);
                            }
                        }
                        if (object.summary != null)
                            message.summary = String(object.summary);
                        if (object.image != null) {
                            if (typeof object.image !== "object")
                                throw TypeError(".movies.info.v1.MovieInfo.image: object expected");
                            message.image = $root.movies.info.v1.ImageInfo.fromObject(object.image);
                        }
                        if (object.year != null)
                            message.year = object.year >>> 0;
                        if (object.runtime != null)
                            message.runtime = object.runtime >>> 0;
                        if (object.rating != null)
                            message.rating = object.rating >>> 0;
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a MovieInfo message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof movies.info.v1.MovieInfo
                     * @static
                     * @param {movies.info.v1.MovieInfo} message MovieInfo
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    MovieInfo.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.arrays || options.defaults) {
                            object.people = [];
                            object.links = [];
                            object.genres = [];
                            object.countries = [];
                            object.ageRating = [];
                            object.tags = [];
                            object.episodes = [];
                        }
                        if (options.defaults) {
                            object.id = "";
                            object.hasVideo = false;
                            object.title = null;
                            object.crew = null;
                            object.image = null;
                        }
                        if (message.id != null && message.hasOwnProperty("id"))
                            object.id = message.id;
                        if (message.hasVideo != null && message.hasOwnProperty("hasVideo"))
                            object.hasVideo = message.hasVideo;
                        if (message.title != null && message.hasOwnProperty("title"))
                            object.title = $root.movies.info.v1.TitleInfo.toObject(message.title, options);
                        if (message.crew != null && message.hasOwnProperty("crew"))
                            object.crew = $root.movies.info.v1.CrewInfo.toObject(message.crew, options);
                        if (message.people && message.people.length) {
                            object.people = [];
                            for (var j = 0; j < message.people.length; ++j)
                                object.people[j] = $root.movies.info.v1.PeopleMap.toObject(message.people[j], options);
                        }
                        if (message.links && message.links.length) {
                            object.links = [];
                            for (var j = 0; j < message.links.length; ++j)
                                object.links[j] = $root.movies.info.v1.Link.toObject(message.links[j], options);
                        }
                        if (message.genres && message.genres.length) {
                            object.genres = [];
                            for (var j = 0; j < message.genres.length; ++j)
                                object.genres[j] = message.genres[j];
                        }
                        if (message.countries && message.countries.length) {
                            object.countries = [];
                            for (var j = 0; j < message.countries.length; ++j)
                                object.countries[j] = message.countries[j];
                        }
                        if (message.ageRating && message.ageRating.length) {
                            object.ageRating = [];
                            for (var j = 0; j < message.ageRating.length; ++j)
                                object.ageRating[j] = message.ageRating[j];
                        }
                        if (message.tags && message.tags.length) {
                            object.tags = [];
                            for (var j = 0; j < message.tags.length; ++j)
                                object.tags[j] = message.tags[j];
                        }
                        if (message.episodes && message.episodes.length) {
                            object.episodes = [];
                            for (var j = 0; j < message.episodes.length; ++j)
                                object.episodes[j] = $root.movies.info.v1.MovieReference.toObject(message.episodes[j], options);
                        }
                        if (message.summary != null && message.hasOwnProperty("summary")) {
                            object.summary = message.summary;
                            if (options.oneofs)
                                object._summary = "summary";
                        }
                        if (message.image != null && message.hasOwnProperty("image"))
                            object.image = $root.movies.info.v1.ImageInfo.toObject(message.image, options);
                        if (message.year != null && message.hasOwnProperty("year")) {
                            object.year = message.year;
                            if (options.oneofs)
                                object._year = "year";
                        }
                        if (message.runtime != null && message.hasOwnProperty("runtime")) {
                            object.runtime = message.runtime;
                            if (options.oneofs)
                                object._runtime = "runtime";
                        }
                        if (message.rating != null && message.hasOwnProperty("rating")) {
                            object.rating = message.rating;
                            if (options.oneofs)
                                object._rating = "rating";
                        }
                        return object;
                    };
    
                    /**
                     * Converts this MovieInfo to JSON.
                     * @function toJSON
                     * @memberof movies.info.v1.MovieInfo
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    MovieInfo.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    return MovieInfo;
                })();
    
                v1.TitleInfo = (function() {
    
                    /**
                     * Properties of a TitleInfo.
                     * @memberof movies.info.v1
                     * @interface ITitleInfo
                     * @property {string|null} [local] TitleInfo local
                     * @property {string|null} [orig] TitleInfo orig
                     */
    
                    /**
                     * Constructs a new TitleInfo.
                     * @memberof movies.info.v1
                     * @classdesc Represents a TitleInfo.
                     * @implements ITitleInfo
                     * @constructor
                     * @param {movies.info.v1.ITitleInfo=} [properties] Properties to set
                     */
                    function TitleInfo(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * TitleInfo local.
                     * @member {string|null|undefined} local
                     * @memberof movies.info.v1.TitleInfo
                     * @instance
                     */
                    TitleInfo.prototype.local = null;
    
                    /**
                     * TitleInfo orig.
                     * @member {string|null|undefined} orig
                     * @memberof movies.info.v1.TitleInfo
                     * @instance
                     */
                    TitleInfo.prototype.orig = null;
    
                    // OneOf field names bound to virtual getters and setters
                    var $oneOfFields;
    
                    /**
                     * TitleInfo _local.
                     * @member {"local"|undefined} _local
                     * @memberof movies.info.v1.TitleInfo
                     * @instance
                     */
                    Object.defineProperty(TitleInfo.prototype, "_local", {
                        get: $util.oneOfGetter($oneOfFields = ["local"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });
    
                    /**
                     * TitleInfo _orig.
                     * @member {"orig"|undefined} _orig
                     * @memberof movies.info.v1.TitleInfo
                     * @instance
                     */
                    Object.defineProperty(TitleInfo.prototype, "_orig", {
                        get: $util.oneOfGetter($oneOfFields = ["orig"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });
    
                    /**
                     * Creates a new TitleInfo instance using the specified properties.
                     * @function create
                     * @memberof movies.info.v1.TitleInfo
                     * @static
                     * @param {movies.info.v1.ITitleInfo=} [properties] Properties to set
                     * @returns {movies.info.v1.TitleInfo} TitleInfo instance
                     */
                    TitleInfo.create = function create(properties) {
                        return new TitleInfo(properties);
                    };
    
                    /**
                     * Encodes the specified TitleInfo message. Does not implicitly {@link movies.info.v1.TitleInfo.verify|verify} messages.
                     * @function encode
                     * @memberof movies.info.v1.TitleInfo
                     * @static
                     * @param {movies.info.v1.ITitleInfo} message TitleInfo message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    TitleInfo.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.local != null && Object.hasOwnProperty.call(message, "local"))
                            writer.uint32(/* id 1, wireType 2 =*/10).string(message.local);
                        if (message.orig != null && Object.hasOwnProperty.call(message, "orig"))
                            writer.uint32(/* id 2, wireType 2 =*/18).string(message.orig);
                        return writer;
                    };
    
                    /**
                     * Encodes the specified TitleInfo message, length delimited. Does not implicitly {@link movies.info.v1.TitleInfo.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof movies.info.v1.TitleInfo
                     * @static
                     * @param {movies.info.v1.ITitleInfo} message TitleInfo message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    TitleInfo.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a TitleInfo message from the specified reader or buffer.
                     * @function decode
                     * @memberof movies.info.v1.TitleInfo
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {movies.info.v1.TitleInfo} TitleInfo
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    TitleInfo.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.movies.info.v1.TitleInfo();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.local = reader.string();
                                break;
                            case 2:
                                message.orig = reader.string();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes a TitleInfo message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof movies.info.v1.TitleInfo
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {movies.info.v1.TitleInfo} TitleInfo
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    TitleInfo.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a TitleInfo message.
                     * @function verify
                     * @memberof movies.info.v1.TitleInfo
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    TitleInfo.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        var properties = {};
                        if (message.local != null && message.hasOwnProperty("local")) {
                            properties._local = 1;
                            if (!$util.isString(message.local))
                                return "local: string expected";
                        }
                        if (message.orig != null && message.hasOwnProperty("orig")) {
                            properties._orig = 1;
                            if (!$util.isString(message.orig))
                                return "orig: string expected";
                        }
                        return null;
                    };
    
                    /**
                     * Creates a TitleInfo message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof movies.info.v1.TitleInfo
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {movies.info.v1.TitleInfo} TitleInfo
                     */
                    TitleInfo.fromObject = function fromObject(object) {
                        if (object instanceof $root.movies.info.v1.TitleInfo)
                            return object;
                        var message = new $root.movies.info.v1.TitleInfo();
                        if (object.local != null)
                            message.local = String(object.local);
                        if (object.orig != null)
                            message.orig = String(object.orig);
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a TitleInfo message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof movies.info.v1.TitleInfo
                     * @static
                     * @param {movies.info.v1.TitleInfo} message TitleInfo
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    TitleInfo.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (message.local != null && message.hasOwnProperty("local")) {
                            object.local = message.local;
                            if (options.oneofs)
                                object._local = "local";
                        }
                        if (message.orig != null && message.hasOwnProperty("orig")) {
                            object.orig = message.orig;
                            if (options.oneofs)
                                object._orig = "orig";
                        }
                        return object;
                    };
    
                    /**
                     * Converts this TitleInfo to JSON.
                     * @function toJSON
                     * @memberof movies.info.v1.TitleInfo
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    TitleInfo.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    return TitleInfo;
                })();
    
                v1.CrewInfo = (function() {
    
                    /**
                     * Properties of a CrewInfo.
                     * @memberof movies.info.v1
                     * @interface ICrewInfo
                     * @property {Array.<movies.info.v1.IPersonInfo>|null} [directors] CrewInfo directors
                     * @property {Array.<movies.info.v1.IPersonInfo>|null} [writers] CrewInfo writers
                     * @property {Array.<movies.info.v1.IPersonInfo>|null} [cast] CrewInfo cast
                     */
    
                    /**
                     * Constructs a new CrewInfo.
                     * @memberof movies.info.v1
                     * @classdesc Represents a CrewInfo.
                     * @implements ICrewInfo
                     * @constructor
                     * @param {movies.info.v1.ICrewInfo=} [properties] Properties to set
                     */
                    function CrewInfo(properties) {
                        this.directors = [];
                        this.writers = [];
                        this.cast = [];
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * CrewInfo directors.
                     * @member {Array.<movies.info.v1.IPersonInfo>} directors
                     * @memberof movies.info.v1.CrewInfo
                     * @instance
                     */
                    CrewInfo.prototype.directors = $util.emptyArray;
    
                    /**
                     * CrewInfo writers.
                     * @member {Array.<movies.info.v1.IPersonInfo>} writers
                     * @memberof movies.info.v1.CrewInfo
                     * @instance
                     */
                    CrewInfo.prototype.writers = $util.emptyArray;
    
                    /**
                     * CrewInfo cast.
                     * @member {Array.<movies.info.v1.IPersonInfo>} cast
                     * @memberof movies.info.v1.CrewInfo
                     * @instance
                     */
                    CrewInfo.prototype.cast = $util.emptyArray;
    
                    /**
                     * Creates a new CrewInfo instance using the specified properties.
                     * @function create
                     * @memberof movies.info.v1.CrewInfo
                     * @static
                     * @param {movies.info.v1.ICrewInfo=} [properties] Properties to set
                     * @returns {movies.info.v1.CrewInfo} CrewInfo instance
                     */
                    CrewInfo.create = function create(properties) {
                        return new CrewInfo(properties);
                    };
    
                    /**
                     * Encodes the specified CrewInfo message. Does not implicitly {@link movies.info.v1.CrewInfo.verify|verify} messages.
                     * @function encode
                     * @memberof movies.info.v1.CrewInfo
                     * @static
                     * @param {movies.info.v1.ICrewInfo} message CrewInfo message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    CrewInfo.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.directors != null && message.directors.length)
                            for (var i = 0; i < message.directors.length; ++i)
                                $root.movies.info.v1.PersonInfo.encode(message.directors[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                        if (message.writers != null && message.writers.length)
                            for (var i = 0; i < message.writers.length; ++i)
                                $root.movies.info.v1.PersonInfo.encode(message.writers[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                        if (message.cast != null && message.cast.length)
                            for (var i = 0; i < message.cast.length; ++i)
                                $root.movies.info.v1.PersonInfo.encode(message.cast[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                        return writer;
                    };
    
                    /**
                     * Encodes the specified CrewInfo message, length delimited. Does not implicitly {@link movies.info.v1.CrewInfo.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof movies.info.v1.CrewInfo
                     * @static
                     * @param {movies.info.v1.ICrewInfo} message CrewInfo message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    CrewInfo.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a CrewInfo message from the specified reader or buffer.
                     * @function decode
                     * @memberof movies.info.v1.CrewInfo
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {movies.info.v1.CrewInfo} CrewInfo
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    CrewInfo.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.movies.info.v1.CrewInfo();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                if (!(message.directors && message.directors.length))
                                    message.directors = [];
                                message.directors.push($root.movies.info.v1.PersonInfo.decode(reader, reader.uint32()));
                                break;
                            case 2:
                                if (!(message.writers && message.writers.length))
                                    message.writers = [];
                                message.writers.push($root.movies.info.v1.PersonInfo.decode(reader, reader.uint32()));
                                break;
                            case 3:
                                if (!(message.cast && message.cast.length))
                                    message.cast = [];
                                message.cast.push($root.movies.info.v1.PersonInfo.decode(reader, reader.uint32()));
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes a CrewInfo message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof movies.info.v1.CrewInfo
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {movies.info.v1.CrewInfo} CrewInfo
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    CrewInfo.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a CrewInfo message.
                     * @function verify
                     * @memberof movies.info.v1.CrewInfo
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    CrewInfo.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.directors != null && message.hasOwnProperty("directors")) {
                            if (!Array.isArray(message.directors))
                                return "directors: array expected";
                            for (var i = 0; i < message.directors.length; ++i) {
                                var error = $root.movies.info.v1.PersonInfo.verify(message.directors[i]);
                                if (error)
                                    return "directors." + error;
                            }
                        }
                        if (message.writers != null && message.hasOwnProperty("writers")) {
                            if (!Array.isArray(message.writers))
                                return "writers: array expected";
                            for (var i = 0; i < message.writers.length; ++i) {
                                var error = $root.movies.info.v1.PersonInfo.verify(message.writers[i]);
                                if (error)
                                    return "writers." + error;
                            }
                        }
                        if (message.cast != null && message.hasOwnProperty("cast")) {
                            if (!Array.isArray(message.cast))
                                return "cast: array expected";
                            for (var i = 0; i < message.cast.length; ++i) {
                                var error = $root.movies.info.v1.PersonInfo.verify(message.cast[i]);
                                if (error)
                                    return "cast." + error;
                            }
                        }
                        return null;
                    };
    
                    /**
                     * Creates a CrewInfo message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof movies.info.v1.CrewInfo
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {movies.info.v1.CrewInfo} CrewInfo
                     */
                    CrewInfo.fromObject = function fromObject(object) {
                        if (object instanceof $root.movies.info.v1.CrewInfo)
                            return object;
                        var message = new $root.movies.info.v1.CrewInfo();
                        if (object.directors) {
                            if (!Array.isArray(object.directors))
                                throw TypeError(".movies.info.v1.CrewInfo.directors: array expected");
                            message.directors = [];
                            for (var i = 0; i < object.directors.length; ++i) {
                                if (typeof object.directors[i] !== "object")
                                    throw TypeError(".movies.info.v1.CrewInfo.directors: object expected");
                                message.directors[i] = $root.movies.info.v1.PersonInfo.fromObject(object.directors[i]);
                            }
                        }
                        if (object.writers) {
                            if (!Array.isArray(object.writers))
                                throw TypeError(".movies.info.v1.CrewInfo.writers: array expected");
                            message.writers = [];
                            for (var i = 0; i < object.writers.length; ++i) {
                                if (typeof object.writers[i] !== "object")
                                    throw TypeError(".movies.info.v1.CrewInfo.writers: object expected");
                                message.writers[i] = $root.movies.info.v1.PersonInfo.fromObject(object.writers[i]);
                            }
                        }
                        if (object.cast) {
                            if (!Array.isArray(object.cast))
                                throw TypeError(".movies.info.v1.CrewInfo.cast: array expected");
                            message.cast = [];
                            for (var i = 0; i < object.cast.length; ++i) {
                                if (typeof object.cast[i] !== "object")
                                    throw TypeError(".movies.info.v1.CrewInfo.cast: object expected");
                                message.cast[i] = $root.movies.info.v1.PersonInfo.fromObject(object.cast[i]);
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a CrewInfo message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof movies.info.v1.CrewInfo
                     * @static
                     * @param {movies.info.v1.CrewInfo} message CrewInfo
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    CrewInfo.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.arrays || options.defaults) {
                            object.directors = [];
                            object.writers = [];
                            object.cast = [];
                        }
                        if (message.directors && message.directors.length) {
                            object.directors = [];
                            for (var j = 0; j < message.directors.length; ++j)
                                object.directors[j] = $root.movies.info.v1.PersonInfo.toObject(message.directors[j], options);
                        }
                        if (message.writers && message.writers.length) {
                            object.writers = [];
                            for (var j = 0; j < message.writers.length; ++j)
                                object.writers[j] = $root.movies.info.v1.PersonInfo.toObject(message.writers[j], options);
                        }
                        if (message.cast && message.cast.length) {
                            object.cast = [];
                            for (var j = 0; j < message.cast.length; ++j)
                                object.cast[j] = $root.movies.info.v1.PersonInfo.toObject(message.cast[j], options);
                        }
                        return object;
                    };
    
                    /**
                     * Converts this CrewInfo to JSON.
                     * @function toJSON
                     * @memberof movies.info.v1.CrewInfo
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    CrewInfo.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    return CrewInfo;
                })();
    
                v1.PersonInfo = (function() {
    
                    /**
                     * Properties of a PersonInfo.
                     * @memberof movies.info.v1
                     * @interface IPersonInfo
                     * @property {string|null} [key] PersonInfo key
                     * @property {string|null} [contribution] PersonInfo contribution
                     */
    
                    /**
                     * Constructs a new PersonInfo.
                     * @memberof movies.info.v1
                     * @classdesc Represents a PersonInfo.
                     * @implements IPersonInfo
                     * @constructor
                     * @param {movies.info.v1.IPersonInfo=} [properties] Properties to set
                     */
                    function PersonInfo(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * PersonInfo key.
                     * @member {string} key
                     * @memberof movies.info.v1.PersonInfo
                     * @instance
                     */
                    PersonInfo.prototype.key = "";
    
                    /**
                     * PersonInfo contribution.
                     * @member {string|null|undefined} contribution
                     * @memberof movies.info.v1.PersonInfo
                     * @instance
                     */
                    PersonInfo.prototype.contribution = null;
    
                    // OneOf field names bound to virtual getters and setters
                    var $oneOfFields;
    
                    /**
                     * PersonInfo _contribution.
                     * @member {"contribution"|undefined} _contribution
                     * @memberof movies.info.v1.PersonInfo
                     * @instance
                     */
                    Object.defineProperty(PersonInfo.prototype, "_contribution", {
                        get: $util.oneOfGetter($oneOfFields = ["contribution"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });
    
                    /**
                     * Creates a new PersonInfo instance using the specified properties.
                     * @function create
                     * @memberof movies.info.v1.PersonInfo
                     * @static
                     * @param {movies.info.v1.IPersonInfo=} [properties] Properties to set
                     * @returns {movies.info.v1.PersonInfo} PersonInfo instance
                     */
                    PersonInfo.create = function create(properties) {
                        return new PersonInfo(properties);
                    };
    
                    /**
                     * Encodes the specified PersonInfo message. Does not implicitly {@link movies.info.v1.PersonInfo.verify|verify} messages.
                     * @function encode
                     * @memberof movies.info.v1.PersonInfo
                     * @static
                     * @param {movies.info.v1.IPersonInfo} message PersonInfo message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    PersonInfo.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                            writer.uint32(/* id 1, wireType 2 =*/10).string(message.key);
                        if (message.contribution != null && Object.hasOwnProperty.call(message, "contribution"))
                            writer.uint32(/* id 2, wireType 2 =*/18).string(message.contribution);
                        return writer;
                    };
    
                    /**
                     * Encodes the specified PersonInfo message, length delimited. Does not implicitly {@link movies.info.v1.PersonInfo.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof movies.info.v1.PersonInfo
                     * @static
                     * @param {movies.info.v1.IPersonInfo} message PersonInfo message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    PersonInfo.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a PersonInfo message from the specified reader or buffer.
                     * @function decode
                     * @memberof movies.info.v1.PersonInfo
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {movies.info.v1.PersonInfo} PersonInfo
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    PersonInfo.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.movies.info.v1.PersonInfo();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.key = reader.string();
                                break;
                            case 2:
                                message.contribution = reader.string();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes a PersonInfo message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof movies.info.v1.PersonInfo
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {movies.info.v1.PersonInfo} PersonInfo
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    PersonInfo.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a PersonInfo message.
                     * @function verify
                     * @memberof movies.info.v1.PersonInfo
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    PersonInfo.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        var properties = {};
                        if (message.key != null && message.hasOwnProperty("key"))
                            if (!$util.isString(message.key))
                                return "key: string expected";
                        if (message.contribution != null && message.hasOwnProperty("contribution")) {
                            properties._contribution = 1;
                            if (!$util.isString(message.contribution))
                                return "contribution: string expected";
                        }
                        return null;
                    };
    
                    /**
                     * Creates a PersonInfo message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof movies.info.v1.PersonInfo
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {movies.info.v1.PersonInfo} PersonInfo
                     */
                    PersonInfo.fromObject = function fromObject(object) {
                        if (object instanceof $root.movies.info.v1.PersonInfo)
                            return object;
                        var message = new $root.movies.info.v1.PersonInfo();
                        if (object.key != null)
                            message.key = String(object.key);
                        if (object.contribution != null)
                            message.contribution = String(object.contribution);
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a PersonInfo message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof movies.info.v1.PersonInfo
                     * @static
                     * @param {movies.info.v1.PersonInfo} message PersonInfo
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    PersonInfo.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.defaults)
                            object.key = "";
                        if (message.key != null && message.hasOwnProperty("key"))
                            object.key = message.key;
                        if (message.contribution != null && message.hasOwnProperty("contribution")) {
                            object.contribution = message.contribution;
                            if (options.oneofs)
                                object._contribution = "contribution";
                        }
                        return object;
                    };
    
                    /**
                     * Converts this PersonInfo to JSON.
                     * @function toJSON
                     * @memberof movies.info.v1.PersonInfo
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    PersonInfo.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    return PersonInfo;
                })();
    
                v1.PeopleMap = (function() {
    
                    /**
                     * Properties of a PeopleMap.
                     * @memberof movies.info.v1
                     * @interface IPeopleMap
                     * @property {string|null} [key] PeopleMap key
                     * @property {string|null} [name] PeopleMap name
                     */
    
                    /**
                     * Constructs a new PeopleMap.
                     * @memberof movies.info.v1
                     * @classdesc Represents a PeopleMap.
                     * @implements IPeopleMap
                     * @constructor
                     * @param {movies.info.v1.IPeopleMap=} [properties] Properties to set
                     */
                    function PeopleMap(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * PeopleMap key.
                     * @member {string} key
                     * @memberof movies.info.v1.PeopleMap
                     * @instance
                     */
                    PeopleMap.prototype.key = "";
    
                    /**
                     * PeopleMap name.
                     * @member {string} name
                     * @memberof movies.info.v1.PeopleMap
                     * @instance
                     */
                    PeopleMap.prototype.name = "";
    
                    /**
                     * Creates a new PeopleMap instance using the specified properties.
                     * @function create
                     * @memberof movies.info.v1.PeopleMap
                     * @static
                     * @param {movies.info.v1.IPeopleMap=} [properties] Properties to set
                     * @returns {movies.info.v1.PeopleMap} PeopleMap instance
                     */
                    PeopleMap.create = function create(properties) {
                        return new PeopleMap(properties);
                    };
    
                    /**
                     * Encodes the specified PeopleMap message. Does not implicitly {@link movies.info.v1.PeopleMap.verify|verify} messages.
                     * @function encode
                     * @memberof movies.info.v1.PeopleMap
                     * @static
                     * @param {movies.info.v1.IPeopleMap} message PeopleMap message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    PeopleMap.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                            writer.uint32(/* id 1, wireType 2 =*/10).string(message.key);
                        if (message.name != null && Object.hasOwnProperty.call(message, "name"))
                            writer.uint32(/* id 2, wireType 2 =*/18).string(message.name);
                        return writer;
                    };
    
                    /**
                     * Encodes the specified PeopleMap message, length delimited. Does not implicitly {@link movies.info.v1.PeopleMap.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof movies.info.v1.PeopleMap
                     * @static
                     * @param {movies.info.v1.IPeopleMap} message PeopleMap message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    PeopleMap.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a PeopleMap message from the specified reader or buffer.
                     * @function decode
                     * @memberof movies.info.v1.PeopleMap
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {movies.info.v1.PeopleMap} PeopleMap
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    PeopleMap.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.movies.info.v1.PeopleMap();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.key = reader.string();
                                break;
                            case 2:
                                message.name = reader.string();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes a PeopleMap message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof movies.info.v1.PeopleMap
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {movies.info.v1.PeopleMap} PeopleMap
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    PeopleMap.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a PeopleMap message.
                     * @function verify
                     * @memberof movies.info.v1.PeopleMap
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    PeopleMap.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.key != null && message.hasOwnProperty("key"))
                            if (!$util.isString(message.key))
                                return "key: string expected";
                        if (message.name != null && message.hasOwnProperty("name"))
                            if (!$util.isString(message.name))
                                return "name: string expected";
                        return null;
                    };
    
                    /**
                     * Creates a PeopleMap message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof movies.info.v1.PeopleMap
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {movies.info.v1.PeopleMap} PeopleMap
                     */
                    PeopleMap.fromObject = function fromObject(object) {
                        if (object instanceof $root.movies.info.v1.PeopleMap)
                            return object;
                        var message = new $root.movies.info.v1.PeopleMap();
                        if (object.key != null)
                            message.key = String(object.key);
                        if (object.name != null)
                            message.name = String(object.name);
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a PeopleMap message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof movies.info.v1.PeopleMap
                     * @static
                     * @param {movies.info.v1.PeopleMap} message PeopleMap
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    PeopleMap.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.defaults) {
                            object.key = "";
                            object.name = "";
                        }
                        if (message.key != null && message.hasOwnProperty("key"))
                            object.key = message.key;
                        if (message.name != null && message.hasOwnProperty("name"))
                            object.name = message.name;
                        return object;
                    };
    
                    /**
                     * Converts this PeopleMap to JSON.
                     * @function toJSON
                     * @memberof movies.info.v1.PeopleMap
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    PeopleMap.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    return PeopleMap;
                })();
    
                v1.Link = (function() {
    
                    /**
                     * Properties of a Link.
                     * @memberof movies.info.v1
                     * @interface ILink
                     * @property {string|null} [href] Link href
                     * @property {string|null} [icon] Link icon
                     * @property {string|null} [label] Link label
                     * @property {string|null} [alt] Link alt
                     * @property {string|null} [rel] Link rel
                     */
    
                    /**
                     * Constructs a new Link.
                     * @memberof movies.info.v1
                     * @classdesc Represents a Link.
                     * @implements ILink
                     * @constructor
                     * @param {movies.info.v1.ILink=} [properties] Properties to set
                     */
                    function Link(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * Link href.
                     * @member {string} href
                     * @memberof movies.info.v1.Link
                     * @instance
                     */
                    Link.prototype.href = "";
    
                    /**
                     * Link icon.
                     * @member {string|null|undefined} icon
                     * @memberof movies.info.v1.Link
                     * @instance
                     */
                    Link.prototype.icon = null;
    
                    /**
                     * Link label.
                     * @member {string|null|undefined} label
                     * @memberof movies.info.v1.Link
                     * @instance
                     */
                    Link.prototype.label = null;
    
                    /**
                     * Link alt.
                     * @member {string|null|undefined} alt
                     * @memberof movies.info.v1.Link
                     * @instance
                     */
                    Link.prototype.alt = null;
    
                    /**
                     * Link rel.
                     * @member {string|null|undefined} rel
                     * @memberof movies.info.v1.Link
                     * @instance
                     */
                    Link.prototype.rel = null;
    
                    // OneOf field names bound to virtual getters and setters
                    var $oneOfFields;
    
                    /**
                     * Link _icon.
                     * @member {"icon"|undefined} _icon
                     * @memberof movies.info.v1.Link
                     * @instance
                     */
                    Object.defineProperty(Link.prototype, "_icon", {
                        get: $util.oneOfGetter($oneOfFields = ["icon"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });
    
                    /**
                     * Link _label.
                     * @member {"label"|undefined} _label
                     * @memberof movies.info.v1.Link
                     * @instance
                     */
                    Object.defineProperty(Link.prototype, "_label", {
                        get: $util.oneOfGetter($oneOfFields = ["label"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });
    
                    /**
                     * Link _alt.
                     * @member {"alt"|undefined} _alt
                     * @memberof movies.info.v1.Link
                     * @instance
                     */
                    Object.defineProperty(Link.prototype, "_alt", {
                        get: $util.oneOfGetter($oneOfFields = ["alt"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });
    
                    /**
                     * Link _rel.
                     * @member {"rel"|undefined} _rel
                     * @memberof movies.info.v1.Link
                     * @instance
                     */
                    Object.defineProperty(Link.prototype, "_rel", {
                        get: $util.oneOfGetter($oneOfFields = ["rel"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });
    
                    /**
                     * Creates a new Link instance using the specified properties.
                     * @function create
                     * @memberof movies.info.v1.Link
                     * @static
                     * @param {movies.info.v1.ILink=} [properties] Properties to set
                     * @returns {movies.info.v1.Link} Link instance
                     */
                    Link.create = function create(properties) {
                        return new Link(properties);
                    };
    
                    /**
                     * Encodes the specified Link message. Does not implicitly {@link movies.info.v1.Link.verify|verify} messages.
                     * @function encode
                     * @memberof movies.info.v1.Link
                     * @static
                     * @param {movies.info.v1.ILink} message Link message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Link.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.href != null && Object.hasOwnProperty.call(message, "href"))
                            writer.uint32(/* id 1, wireType 2 =*/10).string(message.href);
                        if (message.icon != null && Object.hasOwnProperty.call(message, "icon"))
                            writer.uint32(/* id 2, wireType 2 =*/18).string(message.icon);
                        if (message.label != null && Object.hasOwnProperty.call(message, "label"))
                            writer.uint32(/* id 3, wireType 2 =*/26).string(message.label);
                        if (message.alt != null && Object.hasOwnProperty.call(message, "alt"))
                            writer.uint32(/* id 4, wireType 2 =*/34).string(message.alt);
                        if (message.rel != null && Object.hasOwnProperty.call(message, "rel"))
                            writer.uint32(/* id 5, wireType 2 =*/42).string(message.rel);
                        return writer;
                    };
    
                    /**
                     * Encodes the specified Link message, length delimited. Does not implicitly {@link movies.info.v1.Link.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof movies.info.v1.Link
                     * @static
                     * @param {movies.info.v1.ILink} message Link message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Link.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a Link message from the specified reader or buffer.
                     * @function decode
                     * @memberof movies.info.v1.Link
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {movies.info.v1.Link} Link
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Link.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.movies.info.v1.Link();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.href = reader.string();
                                break;
                            case 2:
                                message.icon = reader.string();
                                break;
                            case 3:
                                message.label = reader.string();
                                break;
                            case 4:
                                message.alt = reader.string();
                                break;
                            case 5:
                                message.rel = reader.string();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes a Link message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof movies.info.v1.Link
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {movies.info.v1.Link} Link
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Link.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a Link message.
                     * @function verify
                     * @memberof movies.info.v1.Link
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    Link.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        var properties = {};
                        if (message.href != null && message.hasOwnProperty("href"))
                            if (!$util.isString(message.href))
                                return "href: string expected";
                        if (message.icon != null && message.hasOwnProperty("icon")) {
                            properties._icon = 1;
                            if (!$util.isString(message.icon))
                                return "icon: string expected";
                        }
                        if (message.label != null && message.hasOwnProperty("label")) {
                            properties._label = 1;
                            if (!$util.isString(message.label))
                                return "label: string expected";
                        }
                        if (message.alt != null && message.hasOwnProperty("alt")) {
                            properties._alt = 1;
                            if (!$util.isString(message.alt))
                                return "alt: string expected";
                        }
                        if (message.rel != null && message.hasOwnProperty("rel")) {
                            properties._rel = 1;
                            if (!$util.isString(message.rel))
                                return "rel: string expected";
                        }
                        return null;
                    };
    
                    /**
                     * Creates a Link message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof movies.info.v1.Link
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {movies.info.v1.Link} Link
                     */
                    Link.fromObject = function fromObject(object) {
                        if (object instanceof $root.movies.info.v1.Link)
                            return object;
                        var message = new $root.movies.info.v1.Link();
                        if (object.href != null)
                            message.href = String(object.href);
                        if (object.icon != null)
                            message.icon = String(object.icon);
                        if (object.label != null)
                            message.label = String(object.label);
                        if (object.alt != null)
                            message.alt = String(object.alt);
                        if (object.rel != null)
                            message.rel = String(object.rel);
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a Link message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof movies.info.v1.Link
                     * @static
                     * @param {movies.info.v1.Link} message Link
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Link.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.defaults)
                            object.href = "";
                        if (message.href != null && message.hasOwnProperty("href"))
                            object.href = message.href;
                        if (message.icon != null && message.hasOwnProperty("icon")) {
                            object.icon = message.icon;
                            if (options.oneofs)
                                object._icon = "icon";
                        }
                        if (message.label != null && message.hasOwnProperty("label")) {
                            object.label = message.label;
                            if (options.oneofs)
                                object._label = "label";
                        }
                        if (message.alt != null && message.hasOwnProperty("alt")) {
                            object.alt = message.alt;
                            if (options.oneofs)
                                object._alt = "alt";
                        }
                        if (message.rel != null && message.hasOwnProperty("rel")) {
                            object.rel = message.rel;
                            if (options.oneofs)
                                object._rel = "rel";
                        }
                        return object;
                    };
    
                    /**
                     * Converts this Link to JSON.
                     * @function toJSON
                     * @memberof movies.info.v1.Link
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Link.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    return Link;
                })();
    
                v1.ImageInfo = (function() {
    
                    /**
                     * Properties of an ImageInfo.
                     * @memberof movies.info.v1
                     * @interface IImageInfo
                     * @property {string|null} [highlight] ImageInfo highlight
                     * @property {movies.info.v1.IPosterInfo|null} [poster] ImageInfo poster
                     * @property {Array.<string>|null} [gallery] ImageInfo gallery
                     */
    
                    /**
                     * Constructs a new ImageInfo.
                     * @memberof movies.info.v1
                     * @classdesc Represents an ImageInfo.
                     * @implements IImageInfo
                     * @constructor
                     * @param {movies.info.v1.IImageInfo=} [properties] Properties to set
                     */
                    function ImageInfo(properties) {
                        this.gallery = [];
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * ImageInfo highlight.
                     * @member {string|null|undefined} highlight
                     * @memberof movies.info.v1.ImageInfo
                     * @instance
                     */
                    ImageInfo.prototype.highlight = null;
    
                    /**
                     * ImageInfo poster.
                     * @member {movies.info.v1.IPosterInfo|null|undefined} poster
                     * @memberof movies.info.v1.ImageInfo
                     * @instance
                     */
                    ImageInfo.prototype.poster = null;
    
                    /**
                     * ImageInfo gallery.
                     * @member {Array.<string>} gallery
                     * @memberof movies.info.v1.ImageInfo
                     * @instance
                     */
                    ImageInfo.prototype.gallery = $util.emptyArray;
    
                    // OneOf field names bound to virtual getters and setters
                    var $oneOfFields;
    
                    /**
                     * ImageInfo _highlight.
                     * @member {"highlight"|undefined} _highlight
                     * @memberof movies.info.v1.ImageInfo
                     * @instance
                     */
                    Object.defineProperty(ImageInfo.prototype, "_highlight", {
                        get: $util.oneOfGetter($oneOfFields = ["highlight"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });
    
                    /**
                     * Creates a new ImageInfo instance using the specified properties.
                     * @function create
                     * @memberof movies.info.v1.ImageInfo
                     * @static
                     * @param {movies.info.v1.IImageInfo=} [properties] Properties to set
                     * @returns {movies.info.v1.ImageInfo} ImageInfo instance
                     */
                    ImageInfo.create = function create(properties) {
                        return new ImageInfo(properties);
                    };
    
                    /**
                     * Encodes the specified ImageInfo message. Does not implicitly {@link movies.info.v1.ImageInfo.verify|verify} messages.
                     * @function encode
                     * @memberof movies.info.v1.ImageInfo
                     * @static
                     * @param {movies.info.v1.IImageInfo} message ImageInfo message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ImageInfo.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.highlight != null && Object.hasOwnProperty.call(message, "highlight"))
                            writer.uint32(/* id 1, wireType 2 =*/10).string(message.highlight);
                        if (message.poster != null && Object.hasOwnProperty.call(message, "poster"))
                            $root.movies.info.v1.PosterInfo.encode(message.poster, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                        if (message.gallery != null && message.gallery.length)
                            for (var i = 0; i < message.gallery.length; ++i)
                                writer.uint32(/* id 3, wireType 2 =*/26).string(message.gallery[i]);
                        return writer;
                    };
    
                    /**
                     * Encodes the specified ImageInfo message, length delimited. Does not implicitly {@link movies.info.v1.ImageInfo.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof movies.info.v1.ImageInfo
                     * @static
                     * @param {movies.info.v1.IImageInfo} message ImageInfo message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    ImageInfo.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes an ImageInfo message from the specified reader or buffer.
                     * @function decode
                     * @memberof movies.info.v1.ImageInfo
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {movies.info.v1.ImageInfo} ImageInfo
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ImageInfo.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.movies.info.v1.ImageInfo();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.highlight = reader.string();
                                break;
                            case 2:
                                message.poster = $root.movies.info.v1.PosterInfo.decode(reader, reader.uint32());
                                break;
                            case 3:
                                if (!(message.gallery && message.gallery.length))
                                    message.gallery = [];
                                message.gallery.push(reader.string());
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes an ImageInfo message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof movies.info.v1.ImageInfo
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {movies.info.v1.ImageInfo} ImageInfo
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    ImageInfo.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies an ImageInfo message.
                     * @function verify
                     * @memberof movies.info.v1.ImageInfo
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    ImageInfo.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        var properties = {};
                        if (message.highlight != null && message.hasOwnProperty("highlight")) {
                            properties._highlight = 1;
                            if (!$util.isString(message.highlight))
                                return "highlight: string expected";
                        }
                        if (message.poster != null && message.hasOwnProperty("poster")) {
                            var error = $root.movies.info.v1.PosterInfo.verify(message.poster);
                            if (error)
                                return "poster." + error;
                        }
                        if (message.gallery != null && message.hasOwnProperty("gallery")) {
                            if (!Array.isArray(message.gallery))
                                return "gallery: array expected";
                            for (var i = 0; i < message.gallery.length; ++i)
                                if (!$util.isString(message.gallery[i]))
                                    return "gallery: string[] expected";
                        }
                        return null;
                    };
    
                    /**
                     * Creates an ImageInfo message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof movies.info.v1.ImageInfo
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {movies.info.v1.ImageInfo} ImageInfo
                     */
                    ImageInfo.fromObject = function fromObject(object) {
                        if (object instanceof $root.movies.info.v1.ImageInfo)
                            return object;
                        var message = new $root.movies.info.v1.ImageInfo();
                        if (object.highlight != null)
                            message.highlight = String(object.highlight);
                        if (object.poster != null) {
                            if (typeof object.poster !== "object")
                                throw TypeError(".movies.info.v1.ImageInfo.poster: object expected");
                            message.poster = $root.movies.info.v1.PosterInfo.fromObject(object.poster);
                        }
                        if (object.gallery) {
                            if (!Array.isArray(object.gallery))
                                throw TypeError(".movies.info.v1.ImageInfo.gallery: array expected");
                            message.gallery = [];
                            for (var i = 0; i < object.gallery.length; ++i)
                                message.gallery[i] = String(object.gallery[i]);
                        }
                        return message;
                    };
    
                    /**
                     * Creates a plain object from an ImageInfo message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof movies.info.v1.ImageInfo
                     * @static
                     * @param {movies.info.v1.ImageInfo} message ImageInfo
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    ImageInfo.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.arrays || options.defaults)
                            object.gallery = [];
                        if (options.defaults)
                            object.poster = null;
                        if (message.highlight != null && message.hasOwnProperty("highlight")) {
                            object.highlight = message.highlight;
                            if (options.oneofs)
                                object._highlight = "highlight";
                        }
                        if (message.poster != null && message.hasOwnProperty("poster"))
                            object.poster = $root.movies.info.v1.PosterInfo.toObject(message.poster, options);
                        if (message.gallery && message.gallery.length) {
                            object.gallery = [];
                            for (var j = 0; j < message.gallery.length; ++j)
                                object.gallery[j] = message.gallery[j];
                        }
                        return object;
                    };
    
                    /**
                     * Converts this ImageInfo to JSON.
                     * @function toJSON
                     * @memberof movies.info.v1.ImageInfo
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    ImageInfo.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    return ImageInfo;
                })();
    
                v1.PosterInfo = (function() {
    
                    /**
                     * Properties of a PosterInfo.
                     * @memberof movies.info.v1
                     * @interface IPosterInfo
                     * @property {string|null} [small] PosterInfo small
                     * @property {string|null} [large] PosterInfo large
                     * @property {string|null} [normal] PosterInfo normal
                     */
    
                    /**
                     * Constructs a new PosterInfo.
                     * @memberof movies.info.v1
                     * @classdesc Represents a PosterInfo.
                     * @implements IPosterInfo
                     * @constructor
                     * @param {movies.info.v1.IPosterInfo=} [properties] Properties to set
                     */
                    function PosterInfo(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * PosterInfo small.
                     * @member {string|null|undefined} small
                     * @memberof movies.info.v1.PosterInfo
                     * @instance
                     */
                    PosterInfo.prototype.small = null;
    
                    /**
                     * PosterInfo large.
                     * @member {string|null|undefined} large
                     * @memberof movies.info.v1.PosterInfo
                     * @instance
                     */
                    PosterInfo.prototype.large = null;
    
                    /**
                     * PosterInfo normal.
                     * @member {string|null|undefined} normal
                     * @memberof movies.info.v1.PosterInfo
                     * @instance
                     */
                    PosterInfo.prototype.normal = null;
    
                    // OneOf field names bound to virtual getters and setters
                    var $oneOfFields;
    
                    /**
                     * PosterInfo _small.
                     * @member {"small"|undefined} _small
                     * @memberof movies.info.v1.PosterInfo
                     * @instance
                     */
                    Object.defineProperty(PosterInfo.prototype, "_small", {
                        get: $util.oneOfGetter($oneOfFields = ["small"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });
    
                    /**
                     * PosterInfo _large.
                     * @member {"large"|undefined} _large
                     * @memberof movies.info.v1.PosterInfo
                     * @instance
                     */
                    Object.defineProperty(PosterInfo.prototype, "_large", {
                        get: $util.oneOfGetter($oneOfFields = ["large"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });
    
                    /**
                     * PosterInfo _normal.
                     * @member {"normal"|undefined} _normal
                     * @memberof movies.info.v1.PosterInfo
                     * @instance
                     */
                    Object.defineProperty(PosterInfo.prototype, "_normal", {
                        get: $util.oneOfGetter($oneOfFields = ["normal"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });
    
                    /**
                     * Creates a new PosterInfo instance using the specified properties.
                     * @function create
                     * @memberof movies.info.v1.PosterInfo
                     * @static
                     * @param {movies.info.v1.IPosterInfo=} [properties] Properties to set
                     * @returns {movies.info.v1.PosterInfo} PosterInfo instance
                     */
                    PosterInfo.create = function create(properties) {
                        return new PosterInfo(properties);
                    };
    
                    /**
                     * Encodes the specified PosterInfo message. Does not implicitly {@link movies.info.v1.PosterInfo.verify|verify} messages.
                     * @function encode
                     * @memberof movies.info.v1.PosterInfo
                     * @static
                     * @param {movies.info.v1.IPosterInfo} message PosterInfo message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    PosterInfo.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.small != null && Object.hasOwnProperty.call(message, "small"))
                            writer.uint32(/* id 1, wireType 2 =*/10).string(message.small);
                        if (message.large != null && Object.hasOwnProperty.call(message, "large"))
                            writer.uint32(/* id 2, wireType 2 =*/18).string(message.large);
                        if (message.normal != null && Object.hasOwnProperty.call(message, "normal"))
                            writer.uint32(/* id 3, wireType 2 =*/26).string(message.normal);
                        return writer;
                    };
    
                    /**
                     * Encodes the specified PosterInfo message, length delimited. Does not implicitly {@link movies.info.v1.PosterInfo.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof movies.info.v1.PosterInfo
                     * @static
                     * @param {movies.info.v1.IPosterInfo} message PosterInfo message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    PosterInfo.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a PosterInfo message from the specified reader or buffer.
                     * @function decode
                     * @memberof movies.info.v1.PosterInfo
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {movies.info.v1.PosterInfo} PosterInfo
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    PosterInfo.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.movies.info.v1.PosterInfo();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.small = reader.string();
                                break;
                            case 2:
                                message.large = reader.string();
                                break;
                            case 3:
                                message.normal = reader.string();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes a PosterInfo message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof movies.info.v1.PosterInfo
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {movies.info.v1.PosterInfo} PosterInfo
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    PosterInfo.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a PosterInfo message.
                     * @function verify
                     * @memberof movies.info.v1.PosterInfo
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    PosterInfo.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        var properties = {};
                        if (message.small != null && message.hasOwnProperty("small")) {
                            properties._small = 1;
                            if (!$util.isString(message.small))
                                return "small: string expected";
                        }
                        if (message.large != null && message.hasOwnProperty("large")) {
                            properties._large = 1;
                            if (!$util.isString(message.large))
                                return "large: string expected";
                        }
                        if (message.normal != null && message.hasOwnProperty("normal")) {
                            properties._normal = 1;
                            if (!$util.isString(message.normal))
                                return "normal: string expected";
                        }
                        return null;
                    };
    
                    /**
                     * Creates a PosterInfo message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof movies.info.v1.PosterInfo
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {movies.info.v1.PosterInfo} PosterInfo
                     */
                    PosterInfo.fromObject = function fromObject(object) {
                        if (object instanceof $root.movies.info.v1.PosterInfo)
                            return object;
                        var message = new $root.movies.info.v1.PosterInfo();
                        if (object.small != null)
                            message.small = String(object.small);
                        if (object.large != null)
                            message.large = String(object.large);
                        if (object.normal != null)
                            message.normal = String(object.normal);
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a PosterInfo message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof movies.info.v1.PosterInfo
                     * @static
                     * @param {movies.info.v1.PosterInfo} message PosterInfo
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    PosterInfo.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (message.small != null && message.hasOwnProperty("small")) {
                            object.small = message.small;
                            if (options.oneofs)
                                object._small = "small";
                        }
                        if (message.large != null && message.hasOwnProperty("large")) {
                            object.large = message.large;
                            if (options.oneofs)
                                object._large = "large";
                        }
                        if (message.normal != null && message.hasOwnProperty("normal")) {
                            object.normal = message.normal;
                            if (options.oneofs)
                                object._normal = "normal";
                        }
                        return object;
                    };
    
                    /**
                     * Converts this PosterInfo to JSON.
                     * @function toJSON
                     * @memberof movies.info.v1.PosterInfo
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    PosterInfo.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    return PosterInfo;
                })();
    
                return v1;
            })();
    
            return info;
        })();
    
        movies.listing = (function() {
    
            /**
             * Namespace listing.
             * @memberof movies
             * @namespace
             */
            var listing = {};
    
            listing.v1 = (function() {
    
                /**
                 * Namespace v1.
                 * @memberof movies.listing
                 * @namespace
                 */
                var v1 = {};
    
                v1.MovieReference = (function() {
    
                    /**
                     * Properties of a MovieReference.
                     * @memberof movies.listing.v1
                     * @interface IMovieReference
                     * @property {string|null} [id] MovieReference id
                     * @property {number|null} [pos] MovieReference pos
                     * @property {string|null} [title] MovieReference title
                     * @property {string|null} [cover] MovieReference cover
                     * @property {boolean|null} [hasVideo] MovieReference hasVideo
                     * @property {Array.<string>|null} [tags] MovieReference tags
                     * @property {Array.<string>|null} [ageRating] MovieReference ageRating
                     * @property {string|null} [sortHint] MovieReference sortHint
                     */
    
                    /**
                     * Constructs a new MovieReference.
                     * @memberof movies.listing.v1
                     * @classdesc Represents a MovieReference.
                     * @implements IMovieReference
                     * @constructor
                     * @param {movies.listing.v1.IMovieReference=} [properties] Properties to set
                     */
                    function MovieReference(properties) {
                        this.tags = [];
                        this.ageRating = [];
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * MovieReference id.
                     * @member {string} id
                     * @memberof movies.listing.v1.MovieReference
                     * @instance
                     */
                    MovieReference.prototype.id = "";
    
                    /**
                     * MovieReference pos.
                     * @member {number|null|undefined} pos
                     * @memberof movies.listing.v1.MovieReference
                     * @instance
                     */
                    MovieReference.prototype.pos = null;
    
                    /**
                     * MovieReference title.
                     * @member {string|null|undefined} title
                     * @memberof movies.listing.v1.MovieReference
                     * @instance
                     */
                    MovieReference.prototype.title = null;
    
                    /**
                     * MovieReference cover.
                     * @member {string|null|undefined} cover
                     * @memberof movies.listing.v1.MovieReference
                     * @instance
                     */
                    MovieReference.prototype.cover = null;
    
                    /**
                     * MovieReference hasVideo.
                     * @member {boolean|null|undefined} hasVideo
                     * @memberof movies.listing.v1.MovieReference
                     * @instance
                     */
                    MovieReference.prototype.hasVideo = null;
    
                    /**
                     * MovieReference tags.
                     * @member {Array.<string>} tags
                     * @memberof movies.listing.v1.MovieReference
                     * @instance
                     */
                    MovieReference.prototype.tags = $util.emptyArray;
    
                    /**
                     * MovieReference ageRating.
                     * @member {Array.<string>} ageRating
                     * @memberof movies.listing.v1.MovieReference
                     * @instance
                     */
                    MovieReference.prototype.ageRating = $util.emptyArray;
    
                    /**
                     * MovieReference sortHint.
                     * @member {string} sortHint
                     * @memberof movies.listing.v1.MovieReference
                     * @instance
                     */
                    MovieReference.prototype.sortHint = "";
    
                    // OneOf field names bound to virtual getters and setters
                    var $oneOfFields;
    
                    /**
                     * MovieReference _pos.
                     * @member {"pos"|undefined} _pos
                     * @memberof movies.listing.v1.MovieReference
                     * @instance
                     */
                    Object.defineProperty(MovieReference.prototype, "_pos", {
                        get: $util.oneOfGetter($oneOfFields = ["pos"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });
    
                    /**
                     * MovieReference _title.
                     * @member {"title"|undefined} _title
                     * @memberof movies.listing.v1.MovieReference
                     * @instance
                     */
                    Object.defineProperty(MovieReference.prototype, "_title", {
                        get: $util.oneOfGetter($oneOfFields = ["title"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });
    
                    /**
                     * MovieReference _cover.
                     * @member {"cover"|undefined} _cover
                     * @memberof movies.listing.v1.MovieReference
                     * @instance
                     */
                    Object.defineProperty(MovieReference.prototype, "_cover", {
                        get: $util.oneOfGetter($oneOfFields = ["cover"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });
    
                    /**
                     * MovieReference _hasVideo.
                     * @member {"hasVideo"|undefined} _hasVideo
                     * @memberof movies.listing.v1.MovieReference
                     * @instance
                     */
                    Object.defineProperty(MovieReference.prototype, "_hasVideo", {
                        get: $util.oneOfGetter($oneOfFields = ["hasVideo"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });
    
                    /**
                     * Creates a new MovieReference instance using the specified properties.
                     * @function create
                     * @memberof movies.listing.v1.MovieReference
                     * @static
                     * @param {movies.listing.v1.IMovieReference=} [properties] Properties to set
                     * @returns {movies.listing.v1.MovieReference} MovieReference instance
                     */
                    MovieReference.create = function create(properties) {
                        return new MovieReference(properties);
                    };
    
                    /**
                     * Encodes the specified MovieReference message. Does not implicitly {@link movies.listing.v1.MovieReference.verify|verify} messages.
                     * @function encode
                     * @memberof movies.listing.v1.MovieReference
                     * @static
                     * @param {movies.listing.v1.IMovieReference} message MovieReference message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    MovieReference.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                            writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                        if (message.pos != null && Object.hasOwnProperty.call(message, "pos"))
                            writer.uint32(/* id 2, wireType 0 =*/16).uint32(message.pos);
                        if (message.title != null && Object.hasOwnProperty.call(message, "title"))
                            writer.uint32(/* id 3, wireType 2 =*/26).string(message.title);
                        if (message.cover != null && Object.hasOwnProperty.call(message, "cover"))
                            writer.uint32(/* id 4, wireType 2 =*/34).string(message.cover);
                        if (message.hasVideo != null && Object.hasOwnProperty.call(message, "hasVideo"))
                            writer.uint32(/* id 5, wireType 0 =*/40).bool(message.hasVideo);
                        if (message.tags != null && message.tags.length)
                            for (var i = 0; i < message.tags.length; ++i)
                                writer.uint32(/* id 6, wireType 2 =*/50).string(message.tags[i]);
                        if (message.ageRating != null && message.ageRating.length)
                            for (var i = 0; i < message.ageRating.length; ++i)
                                writer.uint32(/* id 7, wireType 2 =*/58).string(message.ageRating[i]);
                        if (message.sortHint != null && Object.hasOwnProperty.call(message, "sortHint"))
                            writer.uint32(/* id 8, wireType 2 =*/66).string(message.sortHint);
                        return writer;
                    };
    
                    /**
                     * Encodes the specified MovieReference message, length delimited. Does not implicitly {@link movies.listing.v1.MovieReference.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof movies.listing.v1.MovieReference
                     * @static
                     * @param {movies.listing.v1.IMovieReference} message MovieReference message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    MovieReference.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a MovieReference message from the specified reader or buffer.
                     * @function decode
                     * @memberof movies.listing.v1.MovieReference
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {movies.listing.v1.MovieReference} MovieReference
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    MovieReference.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.movies.listing.v1.MovieReference();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.id = reader.string();
                                break;
                            case 2:
                                message.pos = reader.uint32();
                                break;
                            case 3:
                                message.title = reader.string();
                                break;
                            case 4:
                                message.cover = reader.string();
                                break;
                            case 5:
                                message.hasVideo = reader.bool();
                                break;
                            case 6:
                                if (!(message.tags && message.tags.length))
                                    message.tags = [];
                                message.tags.push(reader.string());
                                break;
                            case 7:
                                if (!(message.ageRating && message.ageRating.length))
                                    message.ageRating = [];
                                message.ageRating.push(reader.string());
                                break;
                            case 8:
                                message.sortHint = reader.string();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes a MovieReference message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof movies.listing.v1.MovieReference
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {movies.listing.v1.MovieReference} MovieReference
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    MovieReference.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a MovieReference message.
                     * @function verify
                     * @memberof movies.listing.v1.MovieReference
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    MovieReference.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        var properties = {};
                        if (message.id != null && message.hasOwnProperty("id"))
                            if (!$util.isString(message.id))
                                return "id: string expected";
                        if (message.pos != null && message.hasOwnProperty("pos")) {
                            properties._pos = 1;
                            if (!$util.isInteger(message.pos))
                                return "pos: integer expected";
                        }
                        if (message.title != null && message.hasOwnProperty("title")) {
                            properties._title = 1;
                            if (!$util.isString(message.title))
                                return "title: string expected";
                        }
                        if (message.cover != null && message.hasOwnProperty("cover")) {
                            properties._cover = 1;
                            if (!$util.isString(message.cover))
                                return "cover: string expected";
                        }
                        if (message.hasVideo != null && message.hasOwnProperty("hasVideo")) {
                            properties._hasVideo = 1;
                            if (typeof message.hasVideo !== "boolean")
                                return "hasVideo: boolean expected";
                        }
                        if (message.tags != null && message.hasOwnProperty("tags")) {
                            if (!Array.isArray(message.tags))
                                return "tags: array expected";
                            for (var i = 0; i < message.tags.length; ++i)
                                if (!$util.isString(message.tags[i]))
                                    return "tags: string[] expected";
                        }
                        if (message.ageRating != null && message.hasOwnProperty("ageRating")) {
                            if (!Array.isArray(message.ageRating))
                                return "ageRating: array expected";
                            for (var i = 0; i < message.ageRating.length; ++i)
                                if (!$util.isString(message.ageRating[i]))
                                    return "ageRating: string[] expected";
                        }
                        if (message.sortHint != null && message.hasOwnProperty("sortHint"))
                            if (!$util.isString(message.sortHint))
                                return "sortHint: string expected";
                        return null;
                    };
    
                    /**
                     * Creates a MovieReference message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof movies.listing.v1.MovieReference
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {movies.listing.v1.MovieReference} MovieReference
                     */
                    MovieReference.fromObject = function fromObject(object) {
                        if (object instanceof $root.movies.listing.v1.MovieReference)
                            return object;
                        var message = new $root.movies.listing.v1.MovieReference();
                        if (object.id != null)
                            message.id = String(object.id);
                        if (object.pos != null)
                            message.pos = object.pos >>> 0;
                        if (object.title != null)
                            message.title = String(object.title);
                        if (object.cover != null)
                            message.cover = String(object.cover);
                        if (object.hasVideo != null)
                            message.hasVideo = Boolean(object.hasVideo);
                        if (object.tags) {
                            if (!Array.isArray(object.tags))
                                throw TypeError(".movies.listing.v1.MovieReference.tags: array expected");
                            message.tags = [];
                            for (var i = 0; i < object.tags.length; ++i)
                                message.tags[i] = String(object.tags[i]);
                        }
                        if (object.ageRating) {
                            if (!Array.isArray(object.ageRating))
                                throw TypeError(".movies.listing.v1.MovieReference.ageRating: array expected");
                            message.ageRating = [];
                            for (var i = 0; i < object.ageRating.length; ++i)
                                message.ageRating[i] = String(object.ageRating[i]);
                        }
                        if (object.sortHint != null)
                            message.sortHint = String(object.sortHint);
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a MovieReference message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof movies.listing.v1.MovieReference
                     * @static
                     * @param {movies.listing.v1.MovieReference} message MovieReference
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    MovieReference.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.arrays || options.defaults) {
                            object.tags = [];
                            object.ageRating = [];
                        }
                        if (options.defaults) {
                            object.id = "";
                            object.sortHint = "";
                        }
                        if (message.id != null && message.hasOwnProperty("id"))
                            object.id = message.id;
                        if (message.pos != null && message.hasOwnProperty("pos")) {
                            object.pos = message.pos;
                            if (options.oneofs)
                                object._pos = "pos";
                        }
                        if (message.title != null && message.hasOwnProperty("title")) {
                            object.title = message.title;
                            if (options.oneofs)
                                object._title = "title";
                        }
                        if (message.cover != null && message.hasOwnProperty("cover")) {
                            object.cover = message.cover;
                            if (options.oneofs)
                                object._cover = "cover";
                        }
                        if (message.hasVideo != null && message.hasOwnProperty("hasVideo")) {
                            object.hasVideo = message.hasVideo;
                            if (options.oneofs)
                                object._hasVideo = "hasVideo";
                        }
                        if (message.tags && message.tags.length) {
                            object.tags = [];
                            for (var j = 0; j < message.tags.length; ++j)
                                object.tags[j] = message.tags[j];
                        }
                        if (message.ageRating && message.ageRating.length) {
                            object.ageRating = [];
                            for (var j = 0; j < message.ageRating.length; ++j)
                                object.ageRating[j] = message.ageRating[j];
                        }
                        if (message.sortHint != null && message.hasOwnProperty("sortHint"))
                            object.sortHint = message.sortHint;
                        return object;
                    };
    
                    /**
                     * Converts this MovieReference to JSON.
                     * @function toJSON
                     * @memberof movies.listing.v1.MovieReference
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    MovieReference.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    return MovieReference;
                })();
    
                v1.MovieGroup = (function() {
    
                    /**
                     * Properties of a MovieGroup.
                     * @memberof movies.listing.v1
                     * @interface IMovieGroup
                     * @property {string|null} [id] MovieGroup id
                     * @property {string|null} [title] MovieGroup title
                     * @property {Array.<movies.listing.v1.IMovieReference>|null} [items] MovieGroup items
                     * @property {number|null} [pos] MovieGroup pos
                     */
    
                    /**
                     * Constructs a new MovieGroup.
                     * @memberof movies.listing.v1
                     * @classdesc Represents a MovieGroup.
                     * @implements IMovieGroup
                     * @constructor
                     * @param {movies.listing.v1.IMovieGroup=} [properties] Properties to set
                     */
                    function MovieGroup(properties) {
                        this.items = [];
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * MovieGroup id.
                     * @member {string} id
                     * @memberof movies.listing.v1.MovieGroup
                     * @instance
                     */
                    MovieGroup.prototype.id = "";
    
                    /**
                     * MovieGroup title.
                     * @member {string|null|undefined} title
                     * @memberof movies.listing.v1.MovieGroup
                     * @instance
                     */
                    MovieGroup.prototype.title = null;
    
                    /**
                     * MovieGroup items.
                     * @member {Array.<movies.listing.v1.IMovieReference>} items
                     * @memberof movies.listing.v1.MovieGroup
                     * @instance
                     */
                    MovieGroup.prototype.items = $util.emptyArray;
    
                    /**
                     * MovieGroup pos.
                     * @member {number|null|undefined} pos
                     * @memberof movies.listing.v1.MovieGroup
                     * @instance
                     */
                    MovieGroup.prototype.pos = null;
    
                    // OneOf field names bound to virtual getters and setters
                    var $oneOfFields;
    
                    /**
                     * MovieGroup _title.
                     * @member {"title"|undefined} _title
                     * @memberof movies.listing.v1.MovieGroup
                     * @instance
                     */
                    Object.defineProperty(MovieGroup.prototype, "_title", {
                        get: $util.oneOfGetter($oneOfFields = ["title"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });
    
                    /**
                     * MovieGroup _pos.
                     * @member {"pos"|undefined} _pos
                     * @memberof movies.listing.v1.MovieGroup
                     * @instance
                     */
                    Object.defineProperty(MovieGroup.prototype, "_pos", {
                        get: $util.oneOfGetter($oneOfFields = ["pos"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });
    
                    /**
                     * Creates a new MovieGroup instance using the specified properties.
                     * @function create
                     * @memberof movies.listing.v1.MovieGroup
                     * @static
                     * @param {movies.listing.v1.IMovieGroup=} [properties] Properties to set
                     * @returns {movies.listing.v1.MovieGroup} MovieGroup instance
                     */
                    MovieGroup.create = function create(properties) {
                        return new MovieGroup(properties);
                    };
    
                    /**
                     * Encodes the specified MovieGroup message. Does not implicitly {@link movies.listing.v1.MovieGroup.verify|verify} messages.
                     * @function encode
                     * @memberof movies.listing.v1.MovieGroup
                     * @static
                     * @param {movies.listing.v1.IMovieGroup} message MovieGroup message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    MovieGroup.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                            writer.uint32(/* id 1, wireType 2 =*/10).string(message.id);
                        if (message.title != null && Object.hasOwnProperty.call(message, "title"))
                            writer.uint32(/* id 2, wireType 2 =*/18).string(message.title);
                        if (message.items != null && message.items.length)
                            for (var i = 0; i < message.items.length; ++i)
                                $root.movies.listing.v1.MovieReference.encode(message.items[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                        if (message.pos != null && Object.hasOwnProperty.call(message, "pos"))
                            writer.uint32(/* id 4, wireType 0 =*/32).uint32(message.pos);
                        return writer;
                    };
    
                    /**
                     * Encodes the specified MovieGroup message, length delimited. Does not implicitly {@link movies.listing.v1.MovieGroup.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof movies.listing.v1.MovieGroup
                     * @static
                     * @param {movies.listing.v1.IMovieGroup} message MovieGroup message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    MovieGroup.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a MovieGroup message from the specified reader or buffer.
                     * @function decode
                     * @memberof movies.listing.v1.MovieGroup
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {movies.listing.v1.MovieGroup} MovieGroup
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    MovieGroup.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.movies.listing.v1.MovieGroup();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.id = reader.string();
                                break;
                            case 2:
                                message.title = reader.string();
                                break;
                            case 3:
                                if (!(message.items && message.items.length))
                                    message.items = [];
                                message.items.push($root.movies.listing.v1.MovieReference.decode(reader, reader.uint32()));
                                break;
                            case 4:
                                message.pos = reader.uint32();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes a MovieGroup message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof movies.listing.v1.MovieGroup
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {movies.listing.v1.MovieGroup} MovieGroup
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    MovieGroup.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a MovieGroup message.
                     * @function verify
                     * @memberof movies.listing.v1.MovieGroup
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    MovieGroup.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        var properties = {};
                        if (message.id != null && message.hasOwnProperty("id"))
                            if (!$util.isString(message.id))
                                return "id: string expected";
                        if (message.title != null && message.hasOwnProperty("title")) {
                            properties._title = 1;
                            if (!$util.isString(message.title))
                                return "title: string expected";
                        }
                        if (message.items != null && message.hasOwnProperty("items")) {
                            if (!Array.isArray(message.items))
                                return "items: array expected";
                            for (var i = 0; i < message.items.length; ++i) {
                                var error = $root.movies.listing.v1.MovieReference.verify(message.items[i]);
                                if (error)
                                    return "items." + error;
                            }
                        }
                        if (message.pos != null && message.hasOwnProperty("pos")) {
                            properties._pos = 1;
                            if (!$util.isInteger(message.pos))
                                return "pos: integer expected";
                        }
                        return null;
                    };
    
                    /**
                     * Creates a MovieGroup message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof movies.listing.v1.MovieGroup
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {movies.listing.v1.MovieGroup} MovieGroup
                     */
                    MovieGroup.fromObject = function fromObject(object) {
                        if (object instanceof $root.movies.listing.v1.MovieGroup)
                            return object;
                        var message = new $root.movies.listing.v1.MovieGroup();
                        if (object.id != null)
                            message.id = String(object.id);
                        if (object.title != null)
                            message.title = String(object.title);
                        if (object.items) {
                            if (!Array.isArray(object.items))
                                throw TypeError(".movies.listing.v1.MovieGroup.items: array expected");
                            message.items = [];
                            for (var i = 0; i < object.items.length; ++i) {
                                if (typeof object.items[i] !== "object")
                                    throw TypeError(".movies.listing.v1.MovieGroup.items: object expected");
                                message.items[i] = $root.movies.listing.v1.MovieReference.fromObject(object.items[i]);
                            }
                        }
                        if (object.pos != null)
                            message.pos = object.pos >>> 0;
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a MovieGroup message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof movies.listing.v1.MovieGroup
                     * @static
                     * @param {movies.listing.v1.MovieGroup} message MovieGroup
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    MovieGroup.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.arrays || options.defaults)
                            object.items = [];
                        if (options.defaults)
                            object.id = "";
                        if (message.id != null && message.hasOwnProperty("id"))
                            object.id = message.id;
                        if (message.title != null && message.hasOwnProperty("title")) {
                            object.title = message.title;
                            if (options.oneofs)
                                object._title = "title";
                        }
                        if (message.items && message.items.length) {
                            object.items = [];
                            for (var j = 0; j < message.items.length; ++j)
                                object.items[j] = $root.movies.listing.v1.MovieReference.toObject(message.items[j], options);
                        }
                        if (message.pos != null && message.hasOwnProperty("pos")) {
                            object.pos = message.pos;
                            if (options.oneofs)
                                object._pos = "pos";
                        }
                        return object;
                    };
    
                    /**
                     * Converts this MovieGroup to JSON.
                     * @function toJSON
                     * @memberof movies.listing.v1.MovieGroup
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    MovieGroup.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    return MovieGroup;
                })();
    
                return v1;
            })();
    
            return listing;
        })();
    
        movies.rpc = (function() {
    
            /**
             * Namespace rpc.
             * @memberof movies
             * @namespace
             */
            var rpc = {};
    
            rpc.v1 = (function() {
    
                /**
                 * Namespace v1.
                 * @memberof movies.rpc
                 * @namespace
                 */
                var v1 = {};
    
                v1.Event = (function() {
    
                    /**
                     * Properties of an Event.
                     * @memberof movies.rpc.v1
                     * @interface IEvent
                     * @property {number|null} [id] Event id
                     * @property {movies.db.v1.IListingResponseChangedEvent|null} [listingReponseChanged] Event listingReponseChanged
                     * @property {movies.db.v1.IMovieInfoChangedEvent|null} [movieInfoChanged] Event movieInfoChanged
                     */
    
                    /**
                     * Constructs a new Event.
                     * @memberof movies.rpc.v1
                     * @classdesc Represents an Event.
                     * @implements IEvent
                     * @constructor
                     * @param {movies.rpc.v1.IEvent=} [properties] Properties to set
                     */
                    function Event(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * Event id.
                     * @member {number} id
                     * @memberof movies.rpc.v1.Event
                     * @instance
                     */
                    Event.prototype.id = 0;
    
                    /**
                     * Event listingReponseChanged.
                     * @member {movies.db.v1.IListingResponseChangedEvent|null|undefined} listingReponseChanged
                     * @memberof movies.rpc.v1.Event
                     * @instance
                     */
                    Event.prototype.listingReponseChanged = null;
    
                    /**
                     * Event movieInfoChanged.
                     * @member {movies.db.v1.IMovieInfoChangedEvent|null|undefined} movieInfoChanged
                     * @memberof movies.rpc.v1.Event
                     * @instance
                     */
                    Event.prototype.movieInfoChanged = null;
    
                    // OneOf field names bound to virtual getters and setters
                    var $oneOfFields;
    
                    /**
                     * Event message.
                     * @member {"listingReponseChanged"|"movieInfoChanged"|undefined} message
                     * @memberof movies.rpc.v1.Event
                     * @instance
                     */
                    Object.defineProperty(Event.prototype, "message", {
                        get: $util.oneOfGetter($oneOfFields = ["listingReponseChanged", "movieInfoChanged"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });
    
                    /**
                     * Creates a new Event instance using the specified properties.
                     * @function create
                     * @memberof movies.rpc.v1.Event
                     * @static
                     * @param {movies.rpc.v1.IEvent=} [properties] Properties to set
                     * @returns {movies.rpc.v1.Event} Event instance
                     */
                    Event.create = function create(properties) {
                        return new Event(properties);
                    };
    
                    /**
                     * Encodes the specified Event message. Does not implicitly {@link movies.rpc.v1.Event.verify|verify} messages.
                     * @function encode
                     * @memberof movies.rpc.v1.Event
                     * @static
                     * @param {movies.rpc.v1.IEvent} message Event message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Event.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
                        if (message.listingReponseChanged != null && Object.hasOwnProperty.call(message, "listingReponseChanged"))
                            $root.movies.db.v1.ListingResponseChangedEvent.encode(message.listingReponseChanged, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                        if (message.movieInfoChanged != null && Object.hasOwnProperty.call(message, "movieInfoChanged"))
                            $root.movies.db.v1.MovieInfoChangedEvent.encode(message.movieInfoChanged, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                        return writer;
                    };
    
                    /**
                     * Encodes the specified Event message, length delimited. Does not implicitly {@link movies.rpc.v1.Event.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof movies.rpc.v1.Event
                     * @static
                     * @param {movies.rpc.v1.IEvent} message Event message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Event.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes an Event message from the specified reader or buffer.
                     * @function decode
                     * @memberof movies.rpc.v1.Event
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {movies.rpc.v1.Event} Event
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Event.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.movies.rpc.v1.Event();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.id = reader.int32();
                                break;
                            case 2:
                                message.listingReponseChanged = $root.movies.db.v1.ListingResponseChangedEvent.decode(reader, reader.uint32());
                                break;
                            case 3:
                                message.movieInfoChanged = $root.movies.db.v1.MovieInfoChangedEvent.decode(reader, reader.uint32());
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes an Event message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof movies.rpc.v1.Event
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {movies.rpc.v1.Event} Event
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Event.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies an Event message.
                     * @function verify
                     * @memberof movies.rpc.v1.Event
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    Event.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        var properties = {};
                        if (message.id != null && message.hasOwnProperty("id"))
                            if (!$util.isInteger(message.id))
                                return "id: integer expected";
                        if (message.listingReponseChanged != null && message.hasOwnProperty("listingReponseChanged")) {
                            properties.message = 1;
                            {
                                var error = $root.movies.db.v1.ListingResponseChangedEvent.verify(message.listingReponseChanged);
                                if (error)
                                    return "listingReponseChanged." + error;
                            }
                        }
                        if (message.movieInfoChanged != null && message.hasOwnProperty("movieInfoChanged")) {
                            if (properties.message === 1)
                                return "message: multiple values";
                            properties.message = 1;
                            {
                                var error = $root.movies.db.v1.MovieInfoChangedEvent.verify(message.movieInfoChanged);
                                if (error)
                                    return "movieInfoChanged." + error;
                            }
                        }
                        return null;
                    };
    
                    /**
                     * Creates an Event message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof movies.rpc.v1.Event
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {movies.rpc.v1.Event} Event
                     */
                    Event.fromObject = function fromObject(object) {
                        if (object instanceof $root.movies.rpc.v1.Event)
                            return object;
                        var message = new $root.movies.rpc.v1.Event();
                        if (object.id != null)
                            message.id = object.id | 0;
                        if (object.listingReponseChanged != null) {
                            if (typeof object.listingReponseChanged !== "object")
                                throw TypeError(".movies.rpc.v1.Event.listingReponseChanged: object expected");
                            message.listingReponseChanged = $root.movies.db.v1.ListingResponseChangedEvent.fromObject(object.listingReponseChanged);
                        }
                        if (object.movieInfoChanged != null) {
                            if (typeof object.movieInfoChanged !== "object")
                                throw TypeError(".movies.rpc.v1.Event.movieInfoChanged: object expected");
                            message.movieInfoChanged = $root.movies.db.v1.MovieInfoChangedEvent.fromObject(object.movieInfoChanged);
                        }
                        return message;
                    };
    
                    /**
                     * Creates a plain object from an Event message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof movies.rpc.v1.Event
                     * @static
                     * @param {movies.rpc.v1.Event} message Event
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Event.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.defaults)
                            object.id = 0;
                        if (message.id != null && message.hasOwnProperty("id"))
                            object.id = message.id;
                        if (message.listingReponseChanged != null && message.hasOwnProperty("listingReponseChanged")) {
                            object.listingReponseChanged = $root.movies.db.v1.ListingResponseChangedEvent.toObject(message.listingReponseChanged, options);
                            if (options.oneofs)
                                object.message = "listingReponseChanged";
                        }
                        if (message.movieInfoChanged != null && message.hasOwnProperty("movieInfoChanged")) {
                            object.movieInfoChanged = $root.movies.db.v1.MovieInfoChangedEvent.toObject(message.movieInfoChanged, options);
                            if (options.oneofs)
                                object.message = "movieInfoChanged";
                        }
                        return object;
                    };
    
                    /**
                     * Converts this Event to JSON.
                     * @function toJSON
                     * @memberof movies.rpc.v1.Event
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Event.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    return Event;
                })();
    
                v1.Request = (function() {
    
                    /**
                     * Properties of a Request.
                     * @memberof movies.rpc.v1
                     * @interface IRequest
                     * @property {number|null} [id] Request id
                     * @property {movies.ui.v1.ILangChangeRequest|null} [langChange] Request langChange
                     * @property {movies.ui.v1.IGetConfigRequest|null} [getConfig] Request getConfig
                     * @property {movies.db.v1.IGetListingRequest|null} [getListing] Request getListing
                     * @property {movies.db.v1.IGetMovieInfoRequest|null} [getMovieInfo] Request getMovieInfo
                     * @property {movies.db.v1.IGetVideoFileRequest|null} [getVideoFile] Request getVideoFile
                     */
    
                    /**
                     * Constructs a new Request.
                     * @memberof movies.rpc.v1
                     * @classdesc Represents a Request.
                     * @implements IRequest
                     * @constructor
                     * @param {movies.rpc.v1.IRequest=} [properties] Properties to set
                     */
                    function Request(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * Request id.
                     * @member {number} id
                     * @memberof movies.rpc.v1.Request
                     * @instance
                     */
                    Request.prototype.id = 0;
    
                    /**
                     * Request langChange.
                     * @member {movies.ui.v1.ILangChangeRequest|null|undefined} langChange
                     * @memberof movies.rpc.v1.Request
                     * @instance
                     */
                    Request.prototype.langChange = null;
    
                    /**
                     * Request getConfig.
                     * @member {movies.ui.v1.IGetConfigRequest|null|undefined} getConfig
                     * @memberof movies.rpc.v1.Request
                     * @instance
                     */
                    Request.prototype.getConfig = null;
    
                    /**
                     * Request getListing.
                     * @member {movies.db.v1.IGetListingRequest|null|undefined} getListing
                     * @memberof movies.rpc.v1.Request
                     * @instance
                     */
                    Request.prototype.getListing = null;
    
                    /**
                     * Request getMovieInfo.
                     * @member {movies.db.v1.IGetMovieInfoRequest|null|undefined} getMovieInfo
                     * @memberof movies.rpc.v1.Request
                     * @instance
                     */
                    Request.prototype.getMovieInfo = null;
    
                    /**
                     * Request getVideoFile.
                     * @member {movies.db.v1.IGetVideoFileRequest|null|undefined} getVideoFile
                     * @memberof movies.rpc.v1.Request
                     * @instance
                     */
                    Request.prototype.getVideoFile = null;
    
                    // OneOf field names bound to virtual getters and setters
                    var $oneOfFields;
    
                    /**
                     * Request message.
                     * @member {"langChange"|"getConfig"|"getListing"|"getMovieInfo"|"getVideoFile"|undefined} message
                     * @memberof movies.rpc.v1.Request
                     * @instance
                     */
                    Object.defineProperty(Request.prototype, "message", {
                        get: $util.oneOfGetter($oneOfFields = ["langChange", "getConfig", "getListing", "getMovieInfo", "getVideoFile"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });
    
                    /**
                     * Creates a new Request instance using the specified properties.
                     * @function create
                     * @memberof movies.rpc.v1.Request
                     * @static
                     * @param {movies.rpc.v1.IRequest=} [properties] Properties to set
                     * @returns {movies.rpc.v1.Request} Request instance
                     */
                    Request.create = function create(properties) {
                        return new Request(properties);
                    };
    
                    /**
                     * Encodes the specified Request message. Does not implicitly {@link movies.rpc.v1.Request.verify|verify} messages.
                     * @function encode
                     * @memberof movies.rpc.v1.Request
                     * @static
                     * @param {movies.rpc.v1.IRequest} message Request message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Request.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
                        if (message.langChange != null && Object.hasOwnProperty.call(message, "langChange"))
                            $root.movies.ui.v1.LangChangeRequest.encode(message.langChange, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                        if (message.getConfig != null && Object.hasOwnProperty.call(message, "getConfig"))
                            $root.movies.ui.v1.GetConfigRequest.encode(message.getConfig, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                        if (message.getListing != null && Object.hasOwnProperty.call(message, "getListing"))
                            $root.movies.db.v1.GetListingRequest.encode(message.getListing, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                        if (message.getMovieInfo != null && Object.hasOwnProperty.call(message, "getMovieInfo"))
                            $root.movies.db.v1.GetMovieInfoRequest.encode(message.getMovieInfo, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                        if (message.getVideoFile != null && Object.hasOwnProperty.call(message, "getVideoFile"))
                            $root.movies.db.v1.GetVideoFileRequest.encode(message.getVideoFile, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                        return writer;
                    };
    
                    /**
                     * Encodes the specified Request message, length delimited. Does not implicitly {@link movies.rpc.v1.Request.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof movies.rpc.v1.Request
                     * @static
                     * @param {movies.rpc.v1.IRequest} message Request message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Request.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a Request message from the specified reader or buffer.
                     * @function decode
                     * @memberof movies.rpc.v1.Request
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {movies.rpc.v1.Request} Request
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Request.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.movies.rpc.v1.Request();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.id = reader.int32();
                                break;
                            case 2:
                                message.langChange = $root.movies.ui.v1.LangChangeRequest.decode(reader, reader.uint32());
                                break;
                            case 3:
                                message.getConfig = $root.movies.ui.v1.GetConfigRequest.decode(reader, reader.uint32());
                                break;
                            case 4:
                                message.getListing = $root.movies.db.v1.GetListingRequest.decode(reader, reader.uint32());
                                break;
                            case 5:
                                message.getMovieInfo = $root.movies.db.v1.GetMovieInfoRequest.decode(reader, reader.uint32());
                                break;
                            case 6:
                                message.getVideoFile = $root.movies.db.v1.GetVideoFileRequest.decode(reader, reader.uint32());
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes a Request message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof movies.rpc.v1.Request
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {movies.rpc.v1.Request} Request
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Request.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a Request message.
                     * @function verify
                     * @memberof movies.rpc.v1.Request
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    Request.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        var properties = {};
                        if (message.id != null && message.hasOwnProperty("id"))
                            if (!$util.isInteger(message.id))
                                return "id: integer expected";
                        if (message.langChange != null && message.hasOwnProperty("langChange")) {
                            properties.message = 1;
                            {
                                var error = $root.movies.ui.v1.LangChangeRequest.verify(message.langChange);
                                if (error)
                                    return "langChange." + error;
                            }
                        }
                        if (message.getConfig != null && message.hasOwnProperty("getConfig")) {
                            if (properties.message === 1)
                                return "message: multiple values";
                            properties.message = 1;
                            {
                                var error = $root.movies.ui.v1.GetConfigRequest.verify(message.getConfig);
                                if (error)
                                    return "getConfig." + error;
                            }
                        }
                        if (message.getListing != null && message.hasOwnProperty("getListing")) {
                            if (properties.message === 1)
                                return "message: multiple values";
                            properties.message = 1;
                            {
                                var error = $root.movies.db.v1.GetListingRequest.verify(message.getListing);
                                if (error)
                                    return "getListing." + error;
                            }
                        }
                        if (message.getMovieInfo != null && message.hasOwnProperty("getMovieInfo")) {
                            if (properties.message === 1)
                                return "message: multiple values";
                            properties.message = 1;
                            {
                                var error = $root.movies.db.v1.GetMovieInfoRequest.verify(message.getMovieInfo);
                                if (error)
                                    return "getMovieInfo." + error;
                            }
                        }
                        if (message.getVideoFile != null && message.hasOwnProperty("getVideoFile")) {
                            if (properties.message === 1)
                                return "message: multiple values";
                            properties.message = 1;
                            {
                                var error = $root.movies.db.v1.GetVideoFileRequest.verify(message.getVideoFile);
                                if (error)
                                    return "getVideoFile." + error;
                            }
                        }
                        return null;
                    };
    
                    /**
                     * Creates a Request message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof movies.rpc.v1.Request
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {movies.rpc.v1.Request} Request
                     */
                    Request.fromObject = function fromObject(object) {
                        if (object instanceof $root.movies.rpc.v1.Request)
                            return object;
                        var message = new $root.movies.rpc.v1.Request();
                        if (object.id != null)
                            message.id = object.id | 0;
                        if (object.langChange != null) {
                            if (typeof object.langChange !== "object")
                                throw TypeError(".movies.rpc.v1.Request.langChange: object expected");
                            message.langChange = $root.movies.ui.v1.LangChangeRequest.fromObject(object.langChange);
                        }
                        if (object.getConfig != null) {
                            if (typeof object.getConfig !== "object")
                                throw TypeError(".movies.rpc.v1.Request.getConfig: object expected");
                            message.getConfig = $root.movies.ui.v1.GetConfigRequest.fromObject(object.getConfig);
                        }
                        if (object.getListing != null) {
                            if (typeof object.getListing !== "object")
                                throw TypeError(".movies.rpc.v1.Request.getListing: object expected");
                            message.getListing = $root.movies.db.v1.GetListingRequest.fromObject(object.getListing);
                        }
                        if (object.getMovieInfo != null) {
                            if (typeof object.getMovieInfo !== "object")
                                throw TypeError(".movies.rpc.v1.Request.getMovieInfo: object expected");
                            message.getMovieInfo = $root.movies.db.v1.GetMovieInfoRequest.fromObject(object.getMovieInfo);
                        }
                        if (object.getVideoFile != null) {
                            if (typeof object.getVideoFile !== "object")
                                throw TypeError(".movies.rpc.v1.Request.getVideoFile: object expected");
                            message.getVideoFile = $root.movies.db.v1.GetVideoFileRequest.fromObject(object.getVideoFile);
                        }
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a Request message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof movies.rpc.v1.Request
                     * @static
                     * @param {movies.rpc.v1.Request} message Request
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Request.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.defaults)
                            object.id = 0;
                        if (message.id != null && message.hasOwnProperty("id"))
                            object.id = message.id;
                        if (message.langChange != null && message.hasOwnProperty("langChange")) {
                            object.langChange = $root.movies.ui.v1.LangChangeRequest.toObject(message.langChange, options);
                            if (options.oneofs)
                                object.message = "langChange";
                        }
                        if (message.getConfig != null && message.hasOwnProperty("getConfig")) {
                            object.getConfig = $root.movies.ui.v1.GetConfigRequest.toObject(message.getConfig, options);
                            if (options.oneofs)
                                object.message = "getConfig";
                        }
                        if (message.getListing != null && message.hasOwnProperty("getListing")) {
                            object.getListing = $root.movies.db.v1.GetListingRequest.toObject(message.getListing, options);
                            if (options.oneofs)
                                object.message = "getListing";
                        }
                        if (message.getMovieInfo != null && message.hasOwnProperty("getMovieInfo")) {
                            object.getMovieInfo = $root.movies.db.v1.GetMovieInfoRequest.toObject(message.getMovieInfo, options);
                            if (options.oneofs)
                                object.message = "getMovieInfo";
                        }
                        if (message.getVideoFile != null && message.hasOwnProperty("getVideoFile")) {
                            object.getVideoFile = $root.movies.db.v1.GetVideoFileRequest.toObject(message.getVideoFile, options);
                            if (options.oneofs)
                                object.message = "getVideoFile";
                        }
                        return object;
                    };
    
                    /**
                     * Converts this Request to JSON.
                     * @function toJSON
                     * @memberof movies.rpc.v1.Request
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Request.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    return Request;
                })();
    
                v1.Response = (function() {
    
                    /**
                     * Properties of a Response.
                     * @memberof movies.rpc.v1
                     * @interface IResponse
                     * @property {number|null} [id] Response id
                     * @property {movies.ui.v1.ILangChangeResponse|null} [langChange] Response langChange
                     * @property {movies.ui.v1.IGetConfigResponse|null} [getConfig] Response getConfig
                     * @property {movies.db.v1.IGetListingResponse|null} [getListing] Response getListing
                     * @property {movies.db.v1.IGetMovieInfoResponse|null} [getMovieInfo] Response getMovieInfo
                     * @property {movies.db.v1.IGetVideoFileResponse|null} [getVideoFile] Response getVideoFile
                     */
    
                    /**
                     * Constructs a new Response.
                     * @memberof movies.rpc.v1
                     * @classdesc Represents a Response.
                     * @implements IResponse
                     * @constructor
                     * @param {movies.rpc.v1.IResponse=} [properties] Properties to set
                     */
                    function Response(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * Response id.
                     * @member {number} id
                     * @memberof movies.rpc.v1.Response
                     * @instance
                     */
                    Response.prototype.id = 0;
    
                    /**
                     * Response langChange.
                     * @member {movies.ui.v1.ILangChangeResponse|null|undefined} langChange
                     * @memberof movies.rpc.v1.Response
                     * @instance
                     */
                    Response.prototype.langChange = null;
    
                    /**
                     * Response getConfig.
                     * @member {movies.ui.v1.IGetConfigResponse|null|undefined} getConfig
                     * @memberof movies.rpc.v1.Response
                     * @instance
                     */
                    Response.prototype.getConfig = null;
    
                    /**
                     * Response getListing.
                     * @member {movies.db.v1.IGetListingResponse|null|undefined} getListing
                     * @memberof movies.rpc.v1.Response
                     * @instance
                     */
                    Response.prototype.getListing = null;
    
                    /**
                     * Response getMovieInfo.
                     * @member {movies.db.v1.IGetMovieInfoResponse|null|undefined} getMovieInfo
                     * @memberof movies.rpc.v1.Response
                     * @instance
                     */
                    Response.prototype.getMovieInfo = null;
    
                    /**
                     * Response getVideoFile.
                     * @member {movies.db.v1.IGetVideoFileResponse|null|undefined} getVideoFile
                     * @memberof movies.rpc.v1.Response
                     * @instance
                     */
                    Response.prototype.getVideoFile = null;
    
                    // OneOf field names bound to virtual getters and setters
                    var $oneOfFields;
    
                    /**
                     * Response message.
                     * @member {"langChange"|"getConfig"|"getListing"|"getMovieInfo"|"getVideoFile"|undefined} message
                     * @memberof movies.rpc.v1.Response
                     * @instance
                     */
                    Object.defineProperty(Response.prototype, "message", {
                        get: $util.oneOfGetter($oneOfFields = ["langChange", "getConfig", "getListing", "getMovieInfo", "getVideoFile"]),
                        set: $util.oneOfSetter($oneOfFields)
                    });
    
                    /**
                     * Creates a new Response instance using the specified properties.
                     * @function create
                     * @memberof movies.rpc.v1.Response
                     * @static
                     * @param {movies.rpc.v1.IResponse=} [properties] Properties to set
                     * @returns {movies.rpc.v1.Response} Response instance
                     */
                    Response.create = function create(properties) {
                        return new Response(properties);
                    };
    
                    /**
                     * Encodes the specified Response message. Does not implicitly {@link movies.rpc.v1.Response.verify|verify} messages.
                     * @function encode
                     * @memberof movies.rpc.v1.Response
                     * @static
                     * @param {movies.rpc.v1.IResponse} message Response message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Response.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.id != null && Object.hasOwnProperty.call(message, "id"))
                            writer.uint32(/* id 1, wireType 0 =*/8).int32(message.id);
                        if (message.langChange != null && Object.hasOwnProperty.call(message, "langChange"))
                            $root.movies.ui.v1.LangChangeResponse.encode(message.langChange, writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                        if (message.getConfig != null && Object.hasOwnProperty.call(message, "getConfig"))
                            $root.movies.ui.v1.GetConfigResponse.encode(message.getConfig, writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                        if (message.getListing != null && Object.hasOwnProperty.call(message, "getListing"))
                            $root.movies.db.v1.GetListingResponse.encode(message.getListing, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                        if (message.getMovieInfo != null && Object.hasOwnProperty.call(message, "getMovieInfo"))
                            $root.movies.db.v1.GetMovieInfoResponse.encode(message.getMovieInfo, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                        if (message.getVideoFile != null && Object.hasOwnProperty.call(message, "getVideoFile"))
                            $root.movies.db.v1.GetVideoFileResponse.encode(message.getVideoFile, writer.uint32(/* id 6, wireType 2 =*/50).fork()).ldelim();
                        return writer;
                    };
    
                    /**
                     * Encodes the specified Response message, length delimited. Does not implicitly {@link movies.rpc.v1.Response.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof movies.rpc.v1.Response
                     * @static
                     * @param {movies.rpc.v1.IResponse} message Response message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Response.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a Response message from the specified reader or buffer.
                     * @function decode
                     * @memberof movies.rpc.v1.Response
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {movies.rpc.v1.Response} Response
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Response.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.movies.rpc.v1.Response();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.id = reader.int32();
                                break;
                            case 2:
                                message.langChange = $root.movies.ui.v1.LangChangeResponse.decode(reader, reader.uint32());
                                break;
                            case 3:
                                message.getConfig = $root.movies.ui.v1.GetConfigResponse.decode(reader, reader.uint32());
                                break;
                            case 4:
                                message.getListing = $root.movies.db.v1.GetListingResponse.decode(reader, reader.uint32());
                                break;
                            case 5:
                                message.getMovieInfo = $root.movies.db.v1.GetMovieInfoResponse.decode(reader, reader.uint32());
                                break;
                            case 6:
                                message.getVideoFile = $root.movies.db.v1.GetVideoFileResponse.decode(reader, reader.uint32());
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes a Response message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof movies.rpc.v1.Response
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {movies.rpc.v1.Response} Response
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Response.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a Response message.
                     * @function verify
                     * @memberof movies.rpc.v1.Response
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    Response.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        var properties = {};
                        if (message.id != null && message.hasOwnProperty("id"))
                            if (!$util.isInteger(message.id))
                                return "id: integer expected";
                        if (message.langChange != null && message.hasOwnProperty("langChange")) {
                            properties.message = 1;
                            {
                                var error = $root.movies.ui.v1.LangChangeResponse.verify(message.langChange);
                                if (error)
                                    return "langChange." + error;
                            }
                        }
                        if (message.getConfig != null && message.hasOwnProperty("getConfig")) {
                            if (properties.message === 1)
                                return "message: multiple values";
                            properties.message = 1;
                            {
                                var error = $root.movies.ui.v1.GetConfigResponse.verify(message.getConfig);
                                if (error)
                                    return "getConfig." + error;
                            }
                        }
                        if (message.getListing != null && message.hasOwnProperty("getListing")) {
                            if (properties.message === 1)
                                return "message: multiple values";
                            properties.message = 1;
                            {
                                var error = $root.movies.db.v1.GetListingResponse.verify(message.getListing);
                                if (error)
                                    return "getListing." + error;
                            }
                        }
                        if (message.getMovieInfo != null && message.hasOwnProperty("getMovieInfo")) {
                            if (properties.message === 1)
                                return "message: multiple values";
                            properties.message = 1;
                            {
                                var error = $root.movies.db.v1.GetMovieInfoResponse.verify(message.getMovieInfo);
                                if (error)
                                    return "getMovieInfo." + error;
                            }
                        }
                        if (message.getVideoFile != null && message.hasOwnProperty("getVideoFile")) {
                            if (properties.message === 1)
                                return "message: multiple values";
                            properties.message = 1;
                            {
                                var error = $root.movies.db.v1.GetVideoFileResponse.verify(message.getVideoFile);
                                if (error)
                                    return "getVideoFile." + error;
                            }
                        }
                        return null;
                    };
    
                    /**
                     * Creates a Response message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof movies.rpc.v1.Response
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {movies.rpc.v1.Response} Response
                     */
                    Response.fromObject = function fromObject(object) {
                        if (object instanceof $root.movies.rpc.v1.Response)
                            return object;
                        var message = new $root.movies.rpc.v1.Response();
                        if (object.id != null)
                            message.id = object.id | 0;
                        if (object.langChange != null) {
                            if (typeof object.langChange !== "object")
                                throw TypeError(".movies.rpc.v1.Response.langChange: object expected");
                            message.langChange = $root.movies.ui.v1.LangChangeResponse.fromObject(object.langChange);
                        }
                        if (object.getConfig != null) {
                            if (typeof object.getConfig !== "object")
                                throw TypeError(".movies.rpc.v1.Response.getConfig: object expected");
                            message.getConfig = $root.movies.ui.v1.GetConfigResponse.fromObject(object.getConfig);
                        }
                        if (object.getListing != null) {
                            if (typeof object.getListing !== "object")
                                throw TypeError(".movies.rpc.v1.Response.getListing: object expected");
                            message.getListing = $root.movies.db.v1.GetListingResponse.fromObject(object.getListing);
                        }
                        if (object.getMovieInfo != null) {
                            if (typeof object.getMovieInfo !== "object")
                                throw TypeError(".movies.rpc.v1.Response.getMovieInfo: object expected");
                            message.getMovieInfo = $root.movies.db.v1.GetMovieInfoResponse.fromObject(object.getMovieInfo);
                        }
                        if (object.getVideoFile != null) {
                            if (typeof object.getVideoFile !== "object")
                                throw TypeError(".movies.rpc.v1.Response.getVideoFile: object expected");
                            message.getVideoFile = $root.movies.db.v1.GetVideoFileResponse.fromObject(object.getVideoFile);
                        }
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a Response message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof movies.rpc.v1.Response
                     * @static
                     * @param {movies.rpc.v1.Response} message Response
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Response.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.defaults)
                            object.id = 0;
                        if (message.id != null && message.hasOwnProperty("id"))
                            object.id = message.id;
                        if (message.langChange != null && message.hasOwnProperty("langChange")) {
                            object.langChange = $root.movies.ui.v1.LangChangeResponse.toObject(message.langChange, options);
                            if (options.oneofs)
                                object.message = "langChange";
                        }
                        if (message.getConfig != null && message.hasOwnProperty("getConfig")) {
                            object.getConfig = $root.movies.ui.v1.GetConfigResponse.toObject(message.getConfig, options);
                            if (options.oneofs)
                                object.message = "getConfig";
                        }
                        if (message.getListing != null && message.hasOwnProperty("getListing")) {
                            object.getListing = $root.movies.db.v1.GetListingResponse.toObject(message.getListing, options);
                            if (options.oneofs)
                                object.message = "getListing";
                        }
                        if (message.getMovieInfo != null && message.hasOwnProperty("getMovieInfo")) {
                            object.getMovieInfo = $root.movies.db.v1.GetMovieInfoResponse.toObject(message.getMovieInfo, options);
                            if (options.oneofs)
                                object.message = "getMovieInfo";
                        }
                        if (message.getVideoFile != null && message.hasOwnProperty("getVideoFile")) {
                            object.getVideoFile = $root.movies.db.v1.GetVideoFileResponse.toObject(message.getVideoFile, options);
                            if (options.oneofs)
                                object.message = "getVideoFile";
                        }
                        return object;
                    };
    
                    /**
                     * Converts this Response to JSON.
                     * @function toJSON
                     * @memberof movies.rpc.v1.Response
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Response.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    return Response;
                })();
    
                return v1;
            })();
    
            return rpc;
        })();
    
        movies.ui = (function() {
    
            /**
             * Namespace ui.
             * @memberof movies
             * @namespace
             */
            var ui = {};
    
            ui.v1 = (function() {
    
                /**
                 * Namespace v1.
                 * @memberof movies.ui
                 * @namespace
                 */
                var v1 = {};
    
                v1.LangChangeRequest = (function() {
    
                    /**
                     * Properties of a LangChangeRequest.
                     * @memberof movies.ui.v1
                     * @interface ILangChangeRequest
                     * @property {Array.<string>|null} [langId] LangChangeRequest langId
                     */
    
                    /**
                     * Constructs a new LangChangeRequest.
                     * @memberof movies.ui.v1
                     * @classdesc Represents a LangChangeRequest.
                     * @implements ILangChangeRequest
                     * @constructor
                     * @param {movies.ui.v1.ILangChangeRequest=} [properties] Properties to set
                     */
                    function LangChangeRequest(properties) {
                        this.langId = [];
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * LangChangeRequest langId.
                     * @member {Array.<string>} langId
                     * @memberof movies.ui.v1.LangChangeRequest
                     * @instance
                     */
                    LangChangeRequest.prototype.langId = $util.emptyArray;
    
                    /**
                     * Creates a new LangChangeRequest instance using the specified properties.
                     * @function create
                     * @memberof movies.ui.v1.LangChangeRequest
                     * @static
                     * @param {movies.ui.v1.ILangChangeRequest=} [properties] Properties to set
                     * @returns {movies.ui.v1.LangChangeRequest} LangChangeRequest instance
                     */
                    LangChangeRequest.create = function create(properties) {
                        return new LangChangeRequest(properties);
                    };
    
                    /**
                     * Encodes the specified LangChangeRequest message. Does not implicitly {@link movies.ui.v1.LangChangeRequest.verify|verify} messages.
                     * @function encode
                     * @memberof movies.ui.v1.LangChangeRequest
                     * @static
                     * @param {movies.ui.v1.ILangChangeRequest} message LangChangeRequest message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    LangChangeRequest.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.langId != null && message.langId.length)
                            for (var i = 0; i < message.langId.length; ++i)
                                writer.uint32(/* id 1, wireType 2 =*/10).string(message.langId[i]);
                        return writer;
                    };
    
                    /**
                     * Encodes the specified LangChangeRequest message, length delimited. Does not implicitly {@link movies.ui.v1.LangChangeRequest.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof movies.ui.v1.LangChangeRequest
                     * @static
                     * @param {movies.ui.v1.ILangChangeRequest} message LangChangeRequest message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    LangChangeRequest.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a LangChangeRequest message from the specified reader or buffer.
                     * @function decode
                     * @memberof movies.ui.v1.LangChangeRequest
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {movies.ui.v1.LangChangeRequest} LangChangeRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    LangChangeRequest.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.movies.ui.v1.LangChangeRequest();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                if (!(message.langId && message.langId.length))
                                    message.langId = [];
                                message.langId.push(reader.string());
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes a LangChangeRequest message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof movies.ui.v1.LangChangeRequest
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {movies.ui.v1.LangChangeRequest} LangChangeRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    LangChangeRequest.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a LangChangeRequest message.
                     * @function verify
                     * @memberof movies.ui.v1.LangChangeRequest
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    LangChangeRequest.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.langId != null && message.hasOwnProperty("langId")) {
                            if (!Array.isArray(message.langId))
                                return "langId: array expected";
                            for (var i = 0; i < message.langId.length; ++i)
                                if (!$util.isString(message.langId[i]))
                                    return "langId: string[] expected";
                        }
                        return null;
                    };
    
                    /**
                     * Creates a LangChangeRequest message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof movies.ui.v1.LangChangeRequest
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {movies.ui.v1.LangChangeRequest} LangChangeRequest
                     */
                    LangChangeRequest.fromObject = function fromObject(object) {
                        if (object instanceof $root.movies.ui.v1.LangChangeRequest)
                            return object;
                        var message = new $root.movies.ui.v1.LangChangeRequest();
                        if (object.langId) {
                            if (!Array.isArray(object.langId))
                                throw TypeError(".movies.ui.v1.LangChangeRequest.langId: array expected");
                            message.langId = [];
                            for (var i = 0; i < object.langId.length; ++i)
                                message.langId[i] = String(object.langId[i]);
                        }
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a LangChangeRequest message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof movies.ui.v1.LangChangeRequest
                     * @static
                     * @param {movies.ui.v1.LangChangeRequest} message LangChangeRequest
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    LangChangeRequest.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.arrays || options.defaults)
                            object.langId = [];
                        if (message.langId && message.langId.length) {
                            object.langId = [];
                            for (var j = 0; j < message.langId.length; ++j)
                                object.langId[j] = message.langId[j];
                        }
                        return object;
                    };
    
                    /**
                     * Converts this LangChangeRequest to JSON.
                     * @function toJSON
                     * @memberof movies.ui.v1.LangChangeRequest
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    LangChangeRequest.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    return LangChangeRequest;
                })();
    
                v1.LangChangeResponse = (function() {
    
                    /**
                     * Properties of a LangChangeResponse.
                     * @memberof movies.ui.v1
                     * @interface ILangChangeResponse
                     * @property {string|null} [langId] LangChangeResponse langId
                     */
    
                    /**
                     * Constructs a new LangChangeResponse.
                     * @memberof movies.ui.v1
                     * @classdesc Represents a LangChangeResponse.
                     * @implements ILangChangeResponse
                     * @constructor
                     * @param {movies.ui.v1.ILangChangeResponse=} [properties] Properties to set
                     */
                    function LangChangeResponse(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * LangChangeResponse langId.
                     * @member {string} langId
                     * @memberof movies.ui.v1.LangChangeResponse
                     * @instance
                     */
                    LangChangeResponse.prototype.langId = "";
    
                    /**
                     * Creates a new LangChangeResponse instance using the specified properties.
                     * @function create
                     * @memberof movies.ui.v1.LangChangeResponse
                     * @static
                     * @param {movies.ui.v1.ILangChangeResponse=} [properties] Properties to set
                     * @returns {movies.ui.v1.LangChangeResponse} LangChangeResponse instance
                     */
                    LangChangeResponse.create = function create(properties) {
                        return new LangChangeResponse(properties);
                    };
    
                    /**
                     * Encodes the specified LangChangeResponse message. Does not implicitly {@link movies.ui.v1.LangChangeResponse.verify|verify} messages.
                     * @function encode
                     * @memberof movies.ui.v1.LangChangeResponse
                     * @static
                     * @param {movies.ui.v1.ILangChangeResponse} message LangChangeResponse message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    LangChangeResponse.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.langId != null && Object.hasOwnProperty.call(message, "langId"))
                            writer.uint32(/* id 2, wireType 2 =*/18).string(message.langId);
                        return writer;
                    };
    
                    /**
                     * Encodes the specified LangChangeResponse message, length delimited. Does not implicitly {@link movies.ui.v1.LangChangeResponse.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof movies.ui.v1.LangChangeResponse
                     * @static
                     * @param {movies.ui.v1.ILangChangeResponse} message LangChangeResponse message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    LangChangeResponse.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a LangChangeResponse message from the specified reader or buffer.
                     * @function decode
                     * @memberof movies.ui.v1.LangChangeResponse
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {movies.ui.v1.LangChangeResponse} LangChangeResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    LangChangeResponse.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.movies.ui.v1.LangChangeResponse();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 2:
                                message.langId = reader.string();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes a LangChangeResponse message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof movies.ui.v1.LangChangeResponse
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {movies.ui.v1.LangChangeResponse} LangChangeResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    LangChangeResponse.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a LangChangeResponse message.
                     * @function verify
                     * @memberof movies.ui.v1.LangChangeResponse
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    LangChangeResponse.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.langId != null && message.hasOwnProperty("langId"))
                            if (!$util.isString(message.langId))
                                return "langId: string expected";
                        return null;
                    };
    
                    /**
                     * Creates a LangChangeResponse message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof movies.ui.v1.LangChangeResponse
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {movies.ui.v1.LangChangeResponse} LangChangeResponse
                     */
                    LangChangeResponse.fromObject = function fromObject(object) {
                        if (object instanceof $root.movies.ui.v1.LangChangeResponse)
                            return object;
                        var message = new $root.movies.ui.v1.LangChangeResponse();
                        if (object.langId != null)
                            message.langId = String(object.langId);
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a LangChangeResponse message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof movies.ui.v1.LangChangeResponse
                     * @static
                     * @param {movies.ui.v1.LangChangeResponse} message LangChangeResponse
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    LangChangeResponse.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.defaults)
                            object.langId = "";
                        if (message.langId != null && message.hasOwnProperty("langId"))
                            object.langId = message.langId;
                        return object;
                    };
    
                    /**
                     * Converts this LangChangeResponse to JSON.
                     * @function toJSON
                     * @memberof movies.ui.v1.LangChangeResponse
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    LangChangeResponse.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    return LangChangeResponse;
                })();
    
                v1.GetConfigRequest = (function() {
    
                    /**
                     * Properties of a GetConfigRequest.
                     * @memberof movies.ui.v1
                     * @interface IGetConfigRequest
                     */
    
                    /**
                     * Constructs a new GetConfigRequest.
                     * @memberof movies.ui.v1
                     * @classdesc Represents a GetConfigRequest.
                     * @implements IGetConfigRequest
                     * @constructor
                     * @param {movies.ui.v1.IGetConfigRequest=} [properties] Properties to set
                     */
                    function GetConfigRequest(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * Creates a new GetConfigRequest instance using the specified properties.
                     * @function create
                     * @memberof movies.ui.v1.GetConfigRequest
                     * @static
                     * @param {movies.ui.v1.IGetConfigRequest=} [properties] Properties to set
                     * @returns {movies.ui.v1.GetConfigRequest} GetConfigRequest instance
                     */
                    GetConfigRequest.create = function create(properties) {
                        return new GetConfigRequest(properties);
                    };
    
                    /**
                     * Encodes the specified GetConfigRequest message. Does not implicitly {@link movies.ui.v1.GetConfigRequest.verify|verify} messages.
                     * @function encode
                     * @memberof movies.ui.v1.GetConfigRequest
                     * @static
                     * @param {movies.ui.v1.IGetConfigRequest} message GetConfigRequest message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    GetConfigRequest.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        return writer;
                    };
    
                    /**
                     * Encodes the specified GetConfigRequest message, length delimited. Does not implicitly {@link movies.ui.v1.GetConfigRequest.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof movies.ui.v1.GetConfigRequest
                     * @static
                     * @param {movies.ui.v1.IGetConfigRequest} message GetConfigRequest message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    GetConfigRequest.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a GetConfigRequest message from the specified reader or buffer.
                     * @function decode
                     * @memberof movies.ui.v1.GetConfigRequest
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {movies.ui.v1.GetConfigRequest} GetConfigRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    GetConfigRequest.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.movies.ui.v1.GetConfigRequest();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes a GetConfigRequest message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof movies.ui.v1.GetConfigRequest
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {movies.ui.v1.GetConfigRequest} GetConfigRequest
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    GetConfigRequest.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a GetConfigRequest message.
                     * @function verify
                     * @memberof movies.ui.v1.GetConfigRequest
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    GetConfigRequest.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        return null;
                    };
    
                    /**
                     * Creates a GetConfigRequest message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof movies.ui.v1.GetConfigRequest
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {movies.ui.v1.GetConfigRequest} GetConfigRequest
                     */
                    GetConfigRequest.fromObject = function fromObject(object) {
                        if (object instanceof $root.movies.ui.v1.GetConfigRequest)
                            return object;
                        return new $root.movies.ui.v1.GetConfigRequest();
                    };
    
                    /**
                     * Creates a plain object from a GetConfigRequest message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof movies.ui.v1.GetConfigRequest
                     * @static
                     * @param {movies.ui.v1.GetConfigRequest} message GetConfigRequest
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    GetConfigRequest.toObject = function toObject() {
                        return {};
                    };
    
                    /**
                     * Converts this GetConfigRequest to JSON.
                     * @function toJSON
                     * @memberof movies.ui.v1.GetConfigRequest
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    GetConfigRequest.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    return GetConfigRequest;
                })();
    
                v1.GetConfigResponse = (function() {
    
                    /**
                     * Properties of a GetConfigResponse.
                     * @memberof movies.ui.v1
                     * @interface IGetConfigResponse
                     * @property {Array.<movies.filters.v1.IFilterDescription>|null} [filters] GetConfigResponse filters
                     * @property {Array.<movies.filters.v1.ISortDescription>|null} [sort] GetConfigResponse sort
                     * @property {Array.<movies.ui.v1.IStrings>|null} [countries] GetConfigResponse countries
                     * @property {Array.<movies.ui.v1.IStrings>|null} [tags] GetConfigResponse tags
                     */
    
                    /**
                     * Constructs a new GetConfigResponse.
                     * @memberof movies.ui.v1
                     * @classdesc Represents a GetConfigResponse.
                     * @implements IGetConfigResponse
                     * @constructor
                     * @param {movies.ui.v1.IGetConfigResponse=} [properties] Properties to set
                     */
                    function GetConfigResponse(properties) {
                        this.filters = [];
                        this.sort = [];
                        this.countries = [];
                        this.tags = [];
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * GetConfigResponse filters.
                     * @member {Array.<movies.filters.v1.IFilterDescription>} filters
                     * @memberof movies.ui.v1.GetConfigResponse
                     * @instance
                     */
                    GetConfigResponse.prototype.filters = $util.emptyArray;
    
                    /**
                     * GetConfigResponse sort.
                     * @member {Array.<movies.filters.v1.ISortDescription>} sort
                     * @memberof movies.ui.v1.GetConfigResponse
                     * @instance
                     */
                    GetConfigResponse.prototype.sort = $util.emptyArray;
    
                    /**
                     * GetConfigResponse countries.
                     * @member {Array.<movies.ui.v1.IStrings>} countries
                     * @memberof movies.ui.v1.GetConfigResponse
                     * @instance
                     */
                    GetConfigResponse.prototype.countries = $util.emptyArray;
    
                    /**
                     * GetConfigResponse tags.
                     * @member {Array.<movies.ui.v1.IStrings>} tags
                     * @memberof movies.ui.v1.GetConfigResponse
                     * @instance
                     */
                    GetConfigResponse.prototype.tags = $util.emptyArray;
    
                    /**
                     * Creates a new GetConfigResponse instance using the specified properties.
                     * @function create
                     * @memberof movies.ui.v1.GetConfigResponse
                     * @static
                     * @param {movies.ui.v1.IGetConfigResponse=} [properties] Properties to set
                     * @returns {movies.ui.v1.GetConfigResponse} GetConfigResponse instance
                     */
                    GetConfigResponse.create = function create(properties) {
                        return new GetConfigResponse(properties);
                    };
    
                    /**
                     * Encodes the specified GetConfigResponse message. Does not implicitly {@link movies.ui.v1.GetConfigResponse.verify|verify} messages.
                     * @function encode
                     * @memberof movies.ui.v1.GetConfigResponse
                     * @static
                     * @param {movies.ui.v1.IGetConfigResponse} message GetConfigResponse message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    GetConfigResponse.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.filters != null && message.filters.length)
                            for (var i = 0; i < message.filters.length; ++i)
                                $root.movies.filters.v1.FilterDescription.encode(message.filters[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
                        if (message.sort != null && message.sort.length)
                            for (var i = 0; i < message.sort.length; ++i)
                                $root.movies.filters.v1.SortDescription.encode(message.sort[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                        if (message.countries != null && message.countries.length)
                            for (var i = 0; i < message.countries.length; ++i)
                                $root.movies.ui.v1.Strings.encode(message.countries[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                        if (message.tags != null && message.tags.length)
                            for (var i = 0; i < message.tags.length; ++i)
                                $root.movies.ui.v1.Strings.encode(message.tags[i], writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                        return writer;
                    };
    
                    /**
                     * Encodes the specified GetConfigResponse message, length delimited. Does not implicitly {@link movies.ui.v1.GetConfigResponse.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof movies.ui.v1.GetConfigResponse
                     * @static
                     * @param {movies.ui.v1.IGetConfigResponse} message GetConfigResponse message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    GetConfigResponse.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a GetConfigResponse message from the specified reader or buffer.
                     * @function decode
                     * @memberof movies.ui.v1.GetConfigResponse
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {movies.ui.v1.GetConfigResponse} GetConfigResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    GetConfigResponse.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.movies.ui.v1.GetConfigResponse();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                if (!(message.filters && message.filters.length))
                                    message.filters = [];
                                message.filters.push($root.movies.filters.v1.FilterDescription.decode(reader, reader.uint32()));
                                break;
                            case 2:
                                if (!(message.sort && message.sort.length))
                                    message.sort = [];
                                message.sort.push($root.movies.filters.v1.SortDescription.decode(reader, reader.uint32()));
                                break;
                            case 3:
                                if (!(message.countries && message.countries.length))
                                    message.countries = [];
                                message.countries.push($root.movies.ui.v1.Strings.decode(reader, reader.uint32()));
                                break;
                            case 4:
                                if (!(message.tags && message.tags.length))
                                    message.tags = [];
                                message.tags.push($root.movies.ui.v1.Strings.decode(reader, reader.uint32()));
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes a GetConfigResponse message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof movies.ui.v1.GetConfigResponse
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {movies.ui.v1.GetConfigResponse} GetConfigResponse
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    GetConfigResponse.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a GetConfigResponse message.
                     * @function verify
                     * @memberof movies.ui.v1.GetConfigResponse
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    GetConfigResponse.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.filters != null && message.hasOwnProperty("filters")) {
                            if (!Array.isArray(message.filters))
                                return "filters: array expected";
                            for (var i = 0; i < message.filters.length; ++i) {
                                var error = $root.movies.filters.v1.FilterDescription.verify(message.filters[i]);
                                if (error)
                                    return "filters." + error;
                            }
                        }
                        if (message.sort != null && message.hasOwnProperty("sort")) {
                            if (!Array.isArray(message.sort))
                                return "sort: array expected";
                            for (var i = 0; i < message.sort.length; ++i) {
                                var error = $root.movies.filters.v1.SortDescription.verify(message.sort[i]);
                                if (error)
                                    return "sort." + error;
                            }
                        }
                        if (message.countries != null && message.hasOwnProperty("countries")) {
                            if (!Array.isArray(message.countries))
                                return "countries: array expected";
                            for (var i = 0; i < message.countries.length; ++i) {
                                var error = $root.movies.ui.v1.Strings.verify(message.countries[i]);
                                if (error)
                                    return "countries." + error;
                            }
                        }
                        if (message.tags != null && message.hasOwnProperty("tags")) {
                            if (!Array.isArray(message.tags))
                                return "tags: array expected";
                            for (var i = 0; i < message.tags.length; ++i) {
                                var error = $root.movies.ui.v1.Strings.verify(message.tags[i]);
                                if (error)
                                    return "tags." + error;
                            }
                        }
                        return null;
                    };
    
                    /**
                     * Creates a GetConfigResponse message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof movies.ui.v1.GetConfigResponse
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {movies.ui.v1.GetConfigResponse} GetConfigResponse
                     */
                    GetConfigResponse.fromObject = function fromObject(object) {
                        if (object instanceof $root.movies.ui.v1.GetConfigResponse)
                            return object;
                        var message = new $root.movies.ui.v1.GetConfigResponse();
                        if (object.filters) {
                            if (!Array.isArray(object.filters))
                                throw TypeError(".movies.ui.v1.GetConfigResponse.filters: array expected");
                            message.filters = [];
                            for (var i = 0; i < object.filters.length; ++i) {
                                if (typeof object.filters[i] !== "object")
                                    throw TypeError(".movies.ui.v1.GetConfigResponse.filters: object expected");
                                message.filters[i] = $root.movies.filters.v1.FilterDescription.fromObject(object.filters[i]);
                            }
                        }
                        if (object.sort) {
                            if (!Array.isArray(object.sort))
                                throw TypeError(".movies.ui.v1.GetConfigResponse.sort: array expected");
                            message.sort = [];
                            for (var i = 0; i < object.sort.length; ++i) {
                                if (typeof object.sort[i] !== "object")
                                    throw TypeError(".movies.ui.v1.GetConfigResponse.sort: object expected");
                                message.sort[i] = $root.movies.filters.v1.SortDescription.fromObject(object.sort[i]);
                            }
                        }
                        if (object.countries) {
                            if (!Array.isArray(object.countries))
                                throw TypeError(".movies.ui.v1.GetConfigResponse.countries: array expected");
                            message.countries = [];
                            for (var i = 0; i < object.countries.length; ++i) {
                                if (typeof object.countries[i] !== "object")
                                    throw TypeError(".movies.ui.v1.GetConfigResponse.countries: object expected");
                                message.countries[i] = $root.movies.ui.v1.Strings.fromObject(object.countries[i]);
                            }
                        }
                        if (object.tags) {
                            if (!Array.isArray(object.tags))
                                throw TypeError(".movies.ui.v1.GetConfigResponse.tags: array expected");
                            message.tags = [];
                            for (var i = 0; i < object.tags.length; ++i) {
                                if (typeof object.tags[i] !== "object")
                                    throw TypeError(".movies.ui.v1.GetConfigResponse.tags: object expected");
                                message.tags[i] = $root.movies.ui.v1.Strings.fromObject(object.tags[i]);
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a GetConfigResponse message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof movies.ui.v1.GetConfigResponse
                     * @static
                     * @param {movies.ui.v1.GetConfigResponse} message GetConfigResponse
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    GetConfigResponse.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.arrays || options.defaults) {
                            object.filters = [];
                            object.sort = [];
                            object.countries = [];
                            object.tags = [];
                        }
                        if (message.filters && message.filters.length) {
                            object.filters = [];
                            for (var j = 0; j < message.filters.length; ++j)
                                object.filters[j] = $root.movies.filters.v1.FilterDescription.toObject(message.filters[j], options);
                        }
                        if (message.sort && message.sort.length) {
                            object.sort = [];
                            for (var j = 0; j < message.sort.length; ++j)
                                object.sort[j] = $root.movies.filters.v1.SortDescription.toObject(message.sort[j], options);
                        }
                        if (message.countries && message.countries.length) {
                            object.countries = [];
                            for (var j = 0; j < message.countries.length; ++j)
                                object.countries[j] = $root.movies.ui.v1.Strings.toObject(message.countries[j], options);
                        }
                        if (message.tags && message.tags.length) {
                            object.tags = [];
                            for (var j = 0; j < message.tags.length; ++j)
                                object.tags[j] = $root.movies.ui.v1.Strings.toObject(message.tags[j], options);
                        }
                        return object;
                    };
    
                    /**
                     * Converts this GetConfigResponse to JSON.
                     * @function toJSON
                     * @memberof movies.ui.v1.GetConfigResponse
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    GetConfigResponse.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    return GetConfigResponse;
                })();
    
                v1.Strings = (function() {
    
                    /**
                     * Properties of a Strings.
                     * @memberof movies.ui.v1
                     * @interface IStrings
                     * @property {string|null} [key] Strings key
                     * @property {string|null} [value] Strings value
                     */
    
                    /**
                     * Constructs a new Strings.
                     * @memberof movies.ui.v1
                     * @classdesc Represents a Strings.
                     * @implements IStrings
                     * @constructor
                     * @param {movies.ui.v1.IStrings=} [properties] Properties to set
                     */
                    function Strings(properties) {
                        if (properties)
                            for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                                if (properties[keys[i]] != null)
                                    this[keys[i]] = properties[keys[i]];
                    }
    
                    /**
                     * Strings key.
                     * @member {string} key
                     * @memberof movies.ui.v1.Strings
                     * @instance
                     */
                    Strings.prototype.key = "";
    
                    /**
                     * Strings value.
                     * @member {string} value
                     * @memberof movies.ui.v1.Strings
                     * @instance
                     */
                    Strings.prototype.value = "";
    
                    /**
                     * Creates a new Strings instance using the specified properties.
                     * @function create
                     * @memberof movies.ui.v1.Strings
                     * @static
                     * @param {movies.ui.v1.IStrings=} [properties] Properties to set
                     * @returns {movies.ui.v1.Strings} Strings instance
                     */
                    Strings.create = function create(properties) {
                        return new Strings(properties);
                    };
    
                    /**
                     * Encodes the specified Strings message. Does not implicitly {@link movies.ui.v1.Strings.verify|verify} messages.
                     * @function encode
                     * @memberof movies.ui.v1.Strings
                     * @static
                     * @param {movies.ui.v1.IStrings} message Strings message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Strings.encode = function encode(message, writer) {
                        if (!writer)
                            writer = $Writer.create();
                        if (message.key != null && Object.hasOwnProperty.call(message, "key"))
                            writer.uint32(/* id 1, wireType 2 =*/10).string(message.key);
                        if (message.value != null && Object.hasOwnProperty.call(message, "value"))
                            writer.uint32(/* id 2, wireType 2 =*/18).string(message.value);
                        return writer;
                    };
    
                    /**
                     * Encodes the specified Strings message, length delimited. Does not implicitly {@link movies.ui.v1.Strings.verify|verify} messages.
                     * @function encodeDelimited
                     * @memberof movies.ui.v1.Strings
                     * @static
                     * @param {movies.ui.v1.IStrings} message Strings message or plain object to encode
                     * @param {$protobuf.Writer} [writer] Writer to encode to
                     * @returns {$protobuf.Writer} Writer
                     */
                    Strings.encodeDelimited = function encodeDelimited(message, writer) {
                        return this.encode(message, writer).ldelim();
                    };
    
                    /**
                     * Decodes a Strings message from the specified reader or buffer.
                     * @function decode
                     * @memberof movies.ui.v1.Strings
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @param {number} [length] Message length if known beforehand
                     * @returns {movies.ui.v1.Strings} Strings
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Strings.decode = function decode(reader, length) {
                        if (!(reader instanceof $Reader))
                            reader = $Reader.create(reader);
                        var end = length === undefined ? reader.len : reader.pos + length, message = new $root.movies.ui.v1.Strings();
                        while (reader.pos < end) {
                            var tag = reader.uint32();
                            switch (tag >>> 3) {
                            case 1:
                                message.key = reader.string();
                                break;
                            case 2:
                                message.value = reader.string();
                                break;
                            default:
                                reader.skipType(tag & 7);
                                break;
                            }
                        }
                        return message;
                    };
    
                    /**
                     * Decodes a Strings message from the specified reader or buffer, length delimited.
                     * @function decodeDelimited
                     * @memberof movies.ui.v1.Strings
                     * @static
                     * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
                     * @returns {movies.ui.v1.Strings} Strings
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    Strings.decodeDelimited = function decodeDelimited(reader) {
                        if (!(reader instanceof $Reader))
                            reader = new $Reader(reader);
                        return this.decode(reader, reader.uint32());
                    };
    
                    /**
                     * Verifies a Strings message.
                     * @function verify
                     * @memberof movies.ui.v1.Strings
                     * @static
                     * @param {Object.<string,*>} message Plain object to verify
                     * @returns {string|null} `null` if valid, otherwise the reason why it is not
                     */
                    Strings.verify = function verify(message) {
                        if (typeof message !== "object" || message === null)
                            return "object expected";
                        if (message.key != null && message.hasOwnProperty("key"))
                            if (!$util.isString(message.key))
                                return "key: string expected";
                        if (message.value != null && message.hasOwnProperty("value"))
                            if (!$util.isString(message.value))
                                return "value: string expected";
                        return null;
                    };
    
                    /**
                     * Creates a Strings message from a plain object. Also converts values to their respective internal types.
                     * @function fromObject
                     * @memberof movies.ui.v1.Strings
                     * @static
                     * @param {Object.<string,*>} object Plain object
                     * @returns {movies.ui.v1.Strings} Strings
                     */
                    Strings.fromObject = function fromObject(object) {
                        if (object instanceof $root.movies.ui.v1.Strings)
                            return object;
                        var message = new $root.movies.ui.v1.Strings();
                        if (object.key != null)
                            message.key = String(object.key);
                        if (object.value != null)
                            message.value = String(object.value);
                        return message;
                    };
    
                    /**
                     * Creates a plain object from a Strings message. Also converts values to other types if specified.
                     * @function toObject
                     * @memberof movies.ui.v1.Strings
                     * @static
                     * @param {movies.ui.v1.Strings} message Strings
                     * @param {$protobuf.IConversionOptions} [options] Conversion options
                     * @returns {Object.<string,*>} Plain object
                     */
                    Strings.toObject = function toObject(message, options) {
                        if (!options)
                            options = {};
                        var object = {};
                        if (options.defaults) {
                            object.key = "";
                            object.value = "";
                        }
                        if (message.key != null && message.hasOwnProperty("key"))
                            object.key = message.key;
                        if (message.value != null && message.hasOwnProperty("value"))
                            object.value = message.value;
                        return object;
                    };
    
                    /**
                     * Converts this Strings to JSON.
                     * @function toJSON
                     * @memberof movies.ui.v1.Strings
                     * @instance
                     * @returns {Object.<string,*>} JSON object
                     */
                    Strings.prototype.toJSON = function toJSON() {
                        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
                    };
    
                    return Strings;
                })();
    
                return v1;
            })();
    
            return ui;
        })();
    
        return movies;
    })();

    return $root;
});
