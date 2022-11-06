import * as $protobuf from "protobufjs";
/** Namespace movies. */
export namespace movies {

    /** Namespace db. */
    namespace db {

        /** Namespace v1. */
        namespace v1 {

            /** Properties of a GetListingRequest. */
            interface IGetListingRequest {

                /** GetListingRequest filters */
                filters?: (movies.filters.v1.IFilter[]|null);

                /** GetListingRequest sort */
                sort?: (string[]|null);

                /** GetListingRequest search */
                search?: (string|null);
            }

            /** Represents a GetListingRequest. */
            class GetListingRequest implements IGetListingRequest {

                /**
                 * Constructs a new GetListingRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: movies.db.v1.IGetListingRequest);

                /** GetListingRequest filters. */
                public filters: movies.filters.v1.IFilter[];

                /** GetListingRequest sort. */
                public sort: string[];

                /** GetListingRequest search. */
                public search?: (string|null);

                /** GetListingRequest _search. */
                public _search?: "search";

                /**
                 * Creates a new GetListingRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GetListingRequest instance
                 */
                public static create(properties?: movies.db.v1.IGetListingRequest): movies.db.v1.GetListingRequest;

                /**
                 * Encodes the specified GetListingRequest message. Does not implicitly {@link movies.db.v1.GetListingRequest.verify|verify} messages.
                 * @param message GetListingRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: movies.db.v1.IGetListingRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GetListingRequest message, length delimited. Does not implicitly {@link movies.db.v1.GetListingRequest.verify|verify} messages.
                 * @param message GetListingRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: movies.db.v1.IGetListingRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GetListingRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GetListingRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): movies.db.v1.GetListingRequest;

                /**
                 * Decodes a GetListingRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GetListingRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): movies.db.v1.GetListingRequest;

                /**
                 * Verifies a GetListingRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GetListingRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GetListingRequest
                 */
                public static fromObject(object: { [k: string]: any }): movies.db.v1.GetListingRequest;

                /**
                 * Creates a plain object from a GetListingRequest message. Also converts values to other types if specified.
                 * @param message GetListingRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: movies.db.v1.GetListingRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GetListingRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a GetListingResponse. */
            interface IGetListingResponse {

                /** GetListingResponse groups */
                groups?: (movies.listing.v1.IMovieGroup[]|null);
            }

            /** Represents a GetListingResponse. */
            class GetListingResponse implements IGetListingResponse {

                /**
                 * Constructs a new GetListingResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: movies.db.v1.IGetListingResponse);

                /** GetListingResponse groups. */
                public groups: movies.listing.v1.IMovieGroup[];

                /**
                 * Creates a new GetListingResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GetListingResponse instance
                 */
                public static create(properties?: movies.db.v1.IGetListingResponse): movies.db.v1.GetListingResponse;

                /**
                 * Encodes the specified GetListingResponse message. Does not implicitly {@link movies.db.v1.GetListingResponse.verify|verify} messages.
                 * @param message GetListingResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: movies.db.v1.IGetListingResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GetListingResponse message, length delimited. Does not implicitly {@link movies.db.v1.GetListingResponse.verify|verify} messages.
                 * @param message GetListingResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: movies.db.v1.IGetListingResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GetListingResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GetListingResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): movies.db.v1.GetListingResponse;

                /**
                 * Decodes a GetListingResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GetListingResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): movies.db.v1.GetListingResponse;

                /**
                 * Verifies a GetListingResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GetListingResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GetListingResponse
                 */
                public static fromObject(object: { [k: string]: any }): movies.db.v1.GetListingResponse;

                /**
                 * Creates a plain object from a GetListingResponse message. Also converts values to other types if specified.
                 * @param message GetListingResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: movies.db.v1.GetListingResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GetListingResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a GetMovieInfoRequest. */
            interface IGetMovieInfoRequest {

                /** GetMovieInfoRequest key */
                key?: (string|null);
            }

            /** Represents a GetMovieInfoRequest. */
            class GetMovieInfoRequest implements IGetMovieInfoRequest {

                /**
                 * Constructs a new GetMovieInfoRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: movies.db.v1.IGetMovieInfoRequest);

                /** GetMovieInfoRequest key. */
                public key: string;

                /**
                 * Creates a new GetMovieInfoRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GetMovieInfoRequest instance
                 */
                public static create(properties?: movies.db.v1.IGetMovieInfoRequest): movies.db.v1.GetMovieInfoRequest;

                /**
                 * Encodes the specified GetMovieInfoRequest message. Does not implicitly {@link movies.db.v1.GetMovieInfoRequest.verify|verify} messages.
                 * @param message GetMovieInfoRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: movies.db.v1.IGetMovieInfoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GetMovieInfoRequest message, length delimited. Does not implicitly {@link movies.db.v1.GetMovieInfoRequest.verify|verify} messages.
                 * @param message GetMovieInfoRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: movies.db.v1.IGetMovieInfoRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GetMovieInfoRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GetMovieInfoRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): movies.db.v1.GetMovieInfoRequest;

                /**
                 * Decodes a GetMovieInfoRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GetMovieInfoRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): movies.db.v1.GetMovieInfoRequest;

                /**
                 * Verifies a GetMovieInfoRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GetMovieInfoRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GetMovieInfoRequest
                 */
                public static fromObject(object: { [k: string]: any }): movies.db.v1.GetMovieInfoRequest;

                /**
                 * Creates a plain object from a GetMovieInfoRequest message. Also converts values to other types if specified.
                 * @param message GetMovieInfoRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: movies.db.v1.GetMovieInfoRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GetMovieInfoRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a GetMovieInfoResponse. */
            interface IGetMovieInfoResponse {

                /** GetMovieInfoResponse info */
                info?: (movies.info.v1.IMovieInfo|null);
            }

            /** Represents a GetMovieInfoResponse. */
            class GetMovieInfoResponse implements IGetMovieInfoResponse {

                /**
                 * Constructs a new GetMovieInfoResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: movies.db.v1.IGetMovieInfoResponse);

                /** GetMovieInfoResponse info. */
                public info?: (movies.info.v1.IMovieInfo|null);

                /**
                 * Creates a new GetMovieInfoResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GetMovieInfoResponse instance
                 */
                public static create(properties?: movies.db.v1.IGetMovieInfoResponse): movies.db.v1.GetMovieInfoResponse;

                /**
                 * Encodes the specified GetMovieInfoResponse message. Does not implicitly {@link movies.db.v1.GetMovieInfoResponse.verify|verify} messages.
                 * @param message GetMovieInfoResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: movies.db.v1.IGetMovieInfoResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GetMovieInfoResponse message, length delimited. Does not implicitly {@link movies.db.v1.GetMovieInfoResponse.verify|verify} messages.
                 * @param message GetMovieInfoResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: movies.db.v1.IGetMovieInfoResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GetMovieInfoResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GetMovieInfoResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): movies.db.v1.GetMovieInfoResponse;

                /**
                 * Decodes a GetMovieInfoResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GetMovieInfoResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): movies.db.v1.GetMovieInfoResponse;

                /**
                 * Verifies a GetMovieInfoResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GetMovieInfoResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GetMovieInfoResponse
                 */
                public static fromObject(object: { [k: string]: any }): movies.db.v1.GetMovieInfoResponse;

                /**
                 * Creates a plain object from a GetMovieInfoResponse message. Also converts values to other types if specified.
                 * @param message GetMovieInfoResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: movies.db.v1.GetMovieInfoResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GetMovieInfoResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a GetVideoFileRequest. */
            interface IGetVideoFileRequest {

                /** GetVideoFileRequest key */
                key?: (string|null);
            }

            /** Represents a GetVideoFileRequest. */
            class GetVideoFileRequest implements IGetVideoFileRequest {

                /**
                 * Constructs a new GetVideoFileRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: movies.db.v1.IGetVideoFileRequest);

                /** GetVideoFileRequest key. */
                public key: string;

                /**
                 * Creates a new GetVideoFileRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GetVideoFileRequest instance
                 */
                public static create(properties?: movies.db.v1.IGetVideoFileRequest): movies.db.v1.GetVideoFileRequest;

                /**
                 * Encodes the specified GetVideoFileRequest message. Does not implicitly {@link movies.db.v1.GetVideoFileRequest.verify|verify} messages.
                 * @param message GetVideoFileRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: movies.db.v1.IGetVideoFileRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GetVideoFileRequest message, length delimited. Does not implicitly {@link movies.db.v1.GetVideoFileRequest.verify|verify} messages.
                 * @param message GetVideoFileRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: movies.db.v1.IGetVideoFileRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GetVideoFileRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GetVideoFileRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): movies.db.v1.GetVideoFileRequest;

                /**
                 * Decodes a GetVideoFileRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GetVideoFileRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): movies.db.v1.GetVideoFileRequest;

                /**
                 * Verifies a GetVideoFileRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GetVideoFileRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GetVideoFileRequest
                 */
                public static fromObject(object: { [k: string]: any }): movies.db.v1.GetVideoFileRequest;

                /**
                 * Creates a plain object from a GetVideoFileRequest message. Also converts values to other types if specified.
                 * @param message GetVideoFileRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: movies.db.v1.GetVideoFileRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GetVideoFileRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a GetVideoFileResponse. */
            interface IGetVideoFileResponse {

                /** GetVideoFileResponse uri */
                uri?: (string|null);
            }

            /** Represents a GetVideoFileResponse. */
            class GetVideoFileResponse implements IGetVideoFileResponse {

                /**
                 * Constructs a new GetVideoFileResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: movies.db.v1.IGetVideoFileResponse);

                /** GetVideoFileResponse uri. */
                public uri?: (string|null);

                /** GetVideoFileResponse _uri. */
                public _uri?: "uri";

                /**
                 * Creates a new GetVideoFileResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GetVideoFileResponse instance
                 */
                public static create(properties?: movies.db.v1.IGetVideoFileResponse): movies.db.v1.GetVideoFileResponse;

                /**
                 * Encodes the specified GetVideoFileResponse message. Does not implicitly {@link movies.db.v1.GetVideoFileResponse.verify|verify} messages.
                 * @param message GetVideoFileResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: movies.db.v1.IGetVideoFileResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GetVideoFileResponse message, length delimited. Does not implicitly {@link movies.db.v1.GetVideoFileResponse.verify|verify} messages.
                 * @param message GetVideoFileResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: movies.db.v1.IGetVideoFileResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GetVideoFileResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GetVideoFileResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): movies.db.v1.GetVideoFileResponse;

                /**
                 * Decodes a GetVideoFileResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GetVideoFileResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): movies.db.v1.GetVideoFileResponse;

                /**
                 * Verifies a GetVideoFileResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GetVideoFileResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GetVideoFileResponse
                 */
                public static fromObject(object: { [k: string]: any }): movies.db.v1.GetVideoFileResponse;

                /**
                 * Creates a plain object from a GetVideoFileResponse message. Also converts values to other types if specified.
                 * @param message GetVideoFileResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: movies.db.v1.GetVideoFileResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GetVideoFileResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a ListingResponseChangedEvent. */
            interface IListingResponseChangedEvent {

                /** ListingResponseChangedEvent removed */
                removed?: (movies.info.v1.IMovieGroup[]|null);

                /** ListingResponseChangedEvent added */
                added?: (movies.info.v1.IMovieGroup[]|null);

                /** ListingResponseChangedEvent changed */
                changed?: (movies.info.v1.IMovieGroup[]|null);
            }

            /** Represents a ListingResponseChangedEvent. */
            class ListingResponseChangedEvent implements IListingResponseChangedEvent {

                /**
                 * Constructs a new ListingResponseChangedEvent.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: movies.db.v1.IListingResponseChangedEvent);

                /** ListingResponseChangedEvent removed. */
                public removed: movies.info.v1.IMovieGroup[];

                /** ListingResponseChangedEvent added. */
                public added: movies.info.v1.IMovieGroup[];

                /** ListingResponseChangedEvent changed. */
                public changed: movies.info.v1.IMovieGroup[];

                /**
                 * Creates a new ListingResponseChangedEvent instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ListingResponseChangedEvent instance
                 */
                public static create(properties?: movies.db.v1.IListingResponseChangedEvent): movies.db.v1.ListingResponseChangedEvent;

                /**
                 * Encodes the specified ListingResponseChangedEvent message. Does not implicitly {@link movies.db.v1.ListingResponseChangedEvent.verify|verify} messages.
                 * @param message ListingResponseChangedEvent message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: movies.db.v1.IListingResponseChangedEvent, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ListingResponseChangedEvent message, length delimited. Does not implicitly {@link movies.db.v1.ListingResponseChangedEvent.verify|verify} messages.
                 * @param message ListingResponseChangedEvent message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: movies.db.v1.IListingResponseChangedEvent, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a ListingResponseChangedEvent message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ListingResponseChangedEvent
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): movies.db.v1.ListingResponseChangedEvent;

                /**
                 * Decodes a ListingResponseChangedEvent message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ListingResponseChangedEvent
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): movies.db.v1.ListingResponseChangedEvent;

                /**
                 * Verifies a ListingResponseChangedEvent message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a ListingResponseChangedEvent message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ListingResponseChangedEvent
                 */
                public static fromObject(object: { [k: string]: any }): movies.db.v1.ListingResponseChangedEvent;

                /**
                 * Creates a plain object from a ListingResponseChangedEvent message. Also converts values to other types if specified.
                 * @param message ListingResponseChangedEvent
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: movies.db.v1.ListingResponseChangedEvent, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ListingResponseChangedEvent to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a MovieInfoChangedEvent. */
            interface IMovieInfoChangedEvent {

                /** MovieInfoChangedEvent info */
                info?: (movies.info.v1.IMovieInfo|null);
            }

            /** Represents a MovieInfoChangedEvent. */
            class MovieInfoChangedEvent implements IMovieInfoChangedEvent {

                /**
                 * Constructs a new MovieInfoChangedEvent.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: movies.db.v1.IMovieInfoChangedEvent);

                /** MovieInfoChangedEvent info. */
                public info?: (movies.info.v1.IMovieInfo|null);

                /**
                 * Creates a new MovieInfoChangedEvent instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns MovieInfoChangedEvent instance
                 */
                public static create(properties?: movies.db.v1.IMovieInfoChangedEvent): movies.db.v1.MovieInfoChangedEvent;

                /**
                 * Encodes the specified MovieInfoChangedEvent message. Does not implicitly {@link movies.db.v1.MovieInfoChangedEvent.verify|verify} messages.
                 * @param message MovieInfoChangedEvent message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: movies.db.v1.IMovieInfoChangedEvent, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified MovieInfoChangedEvent message, length delimited. Does not implicitly {@link movies.db.v1.MovieInfoChangedEvent.verify|verify} messages.
                 * @param message MovieInfoChangedEvent message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: movies.db.v1.IMovieInfoChangedEvent, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a MovieInfoChangedEvent message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns MovieInfoChangedEvent
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): movies.db.v1.MovieInfoChangedEvent;

                /**
                 * Decodes a MovieInfoChangedEvent message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns MovieInfoChangedEvent
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): movies.db.v1.MovieInfoChangedEvent;

                /**
                 * Verifies a MovieInfoChangedEvent message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a MovieInfoChangedEvent message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns MovieInfoChangedEvent
                 */
                public static fromObject(object: { [k: string]: any }): movies.db.v1.MovieInfoChangedEvent;

                /**
                 * Creates a plain object from a MovieInfoChangedEvent message. Also converts values to other types if specified.
                 * @param message MovieInfoChangedEvent
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: movies.db.v1.MovieInfoChangedEvent, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this MovieInfoChangedEvent to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }
    }

    /** Namespace filters. */
    namespace filters {

        /** Namespace v1. */
        namespace v1 {

            /** Properties of a RangeFilter. */
            interface IRangeFilter {

                /** RangeFilter field */
                field?: (string|null);

                /** RangeFilter low */
                low?: (number|null);

                /** RangeFilter high */
                high?: (number|null);

                /** RangeFilter includeMissing */
                includeMissing?: (boolean|null);
            }

            /** Represents a RangeFilter. */
            class RangeFilter implements IRangeFilter {

                /**
                 * Constructs a new RangeFilter.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: movies.filters.v1.IRangeFilter);

                /** RangeFilter field. */
                public field: string;

                /** RangeFilter low. */
                public low: number;

                /** RangeFilter high. */
                public high: number;

                /** RangeFilter includeMissing. */
                public includeMissing: boolean;

                /**
                 * Creates a new RangeFilter instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns RangeFilter instance
                 */
                public static create(properties?: movies.filters.v1.IRangeFilter): movies.filters.v1.RangeFilter;

                /**
                 * Encodes the specified RangeFilter message. Does not implicitly {@link movies.filters.v1.RangeFilter.verify|verify} messages.
                 * @param message RangeFilter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: movies.filters.v1.IRangeFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified RangeFilter message, length delimited. Does not implicitly {@link movies.filters.v1.RangeFilter.verify|verify} messages.
                 * @param message RangeFilter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: movies.filters.v1.IRangeFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a RangeFilter message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns RangeFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): movies.filters.v1.RangeFilter;

                /**
                 * Decodes a RangeFilter message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns RangeFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): movies.filters.v1.RangeFilter;

                /**
                 * Verifies a RangeFilter message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a RangeFilter message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns RangeFilter
                 */
                public static fromObject(object: { [k: string]: any }): movies.filters.v1.RangeFilter;

                /**
                 * Creates a plain object from a RangeFilter message. Also converts values to other types if specified.
                 * @param message RangeFilter
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: movies.filters.v1.RangeFilter, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this RangeFilter to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a TokensFilter. */
            interface ITokensFilter {

                /** TokensFilter field */
                field?: (string|null);

                /** TokensFilter token */
                token?: (string[]|null);

                /** TokensFilter includeMissing */
                includeMissing?: (boolean|null);
            }

            /** Represents a TokensFilter. */
            class TokensFilter implements ITokensFilter {

                /**
                 * Constructs a new TokensFilter.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: movies.filters.v1.ITokensFilter);

                /** TokensFilter field. */
                public field: string;

                /** TokensFilter token. */
                public token: string[];

                /** TokensFilter includeMissing. */
                public includeMissing: boolean;

                /**
                 * Creates a new TokensFilter instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns TokensFilter instance
                 */
                public static create(properties?: movies.filters.v1.ITokensFilter): movies.filters.v1.TokensFilter;

                /**
                 * Encodes the specified TokensFilter message. Does not implicitly {@link movies.filters.v1.TokensFilter.verify|verify} messages.
                 * @param message TokensFilter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: movies.filters.v1.ITokensFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified TokensFilter message, length delimited. Does not implicitly {@link movies.filters.v1.TokensFilter.verify|verify} messages.
                 * @param message TokensFilter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: movies.filters.v1.ITokensFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a TokensFilter message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns TokensFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): movies.filters.v1.TokensFilter;

                /**
                 * Decodes a TokensFilter message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns TokensFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): movies.filters.v1.TokensFilter;

                /**
                 * Verifies a TokensFilter message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a TokensFilter message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns TokensFilter
                 */
                public static fromObject(object: { [k: string]: any }): movies.filters.v1.TokensFilter;

                /**
                 * Creates a plain object from a TokensFilter message. Also converts values to other types if specified.
                 * @param message TokensFilter
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: movies.filters.v1.TokensFilter, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this TokensFilter to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of an OnOffFilter. */
            interface IOnOffFilter {

                /** OnOffFilter field */
                field?: (string|null);

                /** OnOffFilter on */
                on?: (boolean|null);
            }

            /** Represents an OnOffFilter. */
            class OnOffFilter implements IOnOffFilter {

                /**
                 * Constructs a new OnOffFilter.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: movies.filters.v1.IOnOffFilter);

                /** OnOffFilter field. */
                public field: string;

                /** OnOffFilter on. */
                public on: boolean;

                /**
                 * Creates a new OnOffFilter instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns OnOffFilter instance
                 */
                public static create(properties?: movies.filters.v1.IOnOffFilter): movies.filters.v1.OnOffFilter;

                /**
                 * Encodes the specified OnOffFilter message. Does not implicitly {@link movies.filters.v1.OnOffFilter.verify|verify} messages.
                 * @param message OnOffFilter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: movies.filters.v1.IOnOffFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified OnOffFilter message, length delimited. Does not implicitly {@link movies.filters.v1.OnOffFilter.verify|verify} messages.
                 * @param message OnOffFilter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: movies.filters.v1.IOnOffFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an OnOffFilter message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns OnOffFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): movies.filters.v1.OnOffFilter;

                /**
                 * Decodes an OnOffFilter message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns OnOffFilter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): movies.filters.v1.OnOffFilter;

                /**
                 * Verifies an OnOffFilter message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an OnOffFilter message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns OnOffFilter
                 */
                public static fromObject(object: { [k: string]: any }): movies.filters.v1.OnOffFilter;

                /**
                 * Creates a plain object from an OnOffFilter message. Also converts values to other types if specified.
                 * @param message OnOffFilter
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: movies.filters.v1.OnOffFilter, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this OnOffFilter to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a Filter. */
            interface IFilter {

                /** Filter range */
                range?: (movies.filters.v1.IRangeFilter|null);

                /** Filter tokens */
                tokens?: (movies.filters.v1.ITokensFilter|null);

                /** Filter onOff */
                onOff?: (movies.filters.v1.IOnOffFilter|null);
            }

            /** Represents a Filter. */
            class Filter implements IFilter {

                /**
                 * Constructs a new Filter.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: movies.filters.v1.IFilter);

                /** Filter range. */
                public range?: (movies.filters.v1.IRangeFilter|null);

                /** Filter tokens. */
                public tokens?: (movies.filters.v1.ITokensFilter|null);

                /** Filter onOff. */
                public onOff?: (movies.filters.v1.IOnOffFilter|null);

                /** Filter kind. */
                public kind?: ("range"|"tokens"|"onOff");

                /**
                 * Creates a new Filter instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Filter instance
                 */
                public static create(properties?: movies.filters.v1.IFilter): movies.filters.v1.Filter;

                /**
                 * Encodes the specified Filter message. Does not implicitly {@link movies.filters.v1.Filter.verify|verify} messages.
                 * @param message Filter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: movies.filters.v1.IFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Filter message, length delimited. Does not implicitly {@link movies.filters.v1.Filter.verify|verify} messages.
                 * @param message Filter message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: movies.filters.v1.IFilter, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Filter message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Filter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): movies.filters.v1.Filter;

                /**
                 * Decodes a Filter message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Filter
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): movies.filters.v1.Filter;

                /**
                 * Verifies a Filter message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Filter message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Filter
                 */
                public static fromObject(object: { [k: string]: any }): movies.filters.v1.Filter;

                /**
                 * Creates a plain object from a Filter message. Also converts values to other types if specified.
                 * @param message Filter
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: movies.filters.v1.Filter, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Filter to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a DescriptionId. */
            interface IDescriptionId {

                /** DescriptionId field */
                field?: (string|null);

                /** DescriptionId label */
                label?: (string|null);

                /** DescriptionId icon */
                icon?: (string|null);
            }

            /** Represents a DescriptionId. */
            class DescriptionId implements IDescriptionId {

                /**
                 * Constructs a new DescriptionId.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: movies.filters.v1.IDescriptionId);

                /** DescriptionId field. */
                public field: string;

                /** DescriptionId label. */
                public label: string;

                /** DescriptionId icon. */
                public icon?: (string|null);

                /** DescriptionId _icon. */
                public _icon?: "icon";

                /**
                 * Creates a new DescriptionId instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns DescriptionId instance
                 */
                public static create(properties?: movies.filters.v1.IDescriptionId): movies.filters.v1.DescriptionId;

                /**
                 * Encodes the specified DescriptionId message. Does not implicitly {@link movies.filters.v1.DescriptionId.verify|verify} messages.
                 * @param message DescriptionId message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: movies.filters.v1.IDescriptionId, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified DescriptionId message, length delimited. Does not implicitly {@link movies.filters.v1.DescriptionId.verify|verify} messages.
                 * @param message DescriptionId message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: movies.filters.v1.IDescriptionId, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a DescriptionId message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns DescriptionId
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): movies.filters.v1.DescriptionId;

                /**
                 * Decodes a DescriptionId message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns DescriptionId
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): movies.filters.v1.DescriptionId;

                /**
                 * Verifies a DescriptionId message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a DescriptionId message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns DescriptionId
                 */
                public static fromObject(object: { [k: string]: any }): movies.filters.v1.DescriptionId;

                /**
                 * Creates a plain object from a DescriptionId message. Also converts values to other types if specified.
                 * @param message DescriptionId
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: movies.filters.v1.DescriptionId, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this DescriptionId to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a RangeFilterDescription. */
            interface IRangeFilterDescription {

                /** RangeFilterDescription low */
                low?: (number|null);

                /** RangeFilterDescription high */
                high?: (number|null);

                /** RangeFilterDescription isOptional */
                isOptional?: (boolean|null);

                /** RangeFilterDescription step */
                step?: (number|null);

                /** RangeFilterDescription steps */
                steps?: (movies.filters.v1.RangeFilterDescription.IList|null);
            }

            /** Represents a RangeFilterDescription. */
            class RangeFilterDescription implements IRangeFilterDescription {

                /**
                 * Constructs a new RangeFilterDescription.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: movies.filters.v1.IRangeFilterDescription);

                /** RangeFilterDescription low. */
                public low: number;

                /** RangeFilterDescription high. */
                public high: number;

                /** RangeFilterDescription isOptional. */
                public isOptional: boolean;

                /** RangeFilterDescription step. */
                public step?: (number|null);

                /** RangeFilterDescription steps. */
                public steps?: (movies.filters.v1.RangeFilterDescription.IList|null);

                /** RangeFilterDescription type. */
                public type?: ("step"|"steps");

                /**
                 * Creates a new RangeFilterDescription instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns RangeFilterDescription instance
                 */
                public static create(properties?: movies.filters.v1.IRangeFilterDescription): movies.filters.v1.RangeFilterDescription;

                /**
                 * Encodes the specified RangeFilterDescription message. Does not implicitly {@link movies.filters.v1.RangeFilterDescription.verify|verify} messages.
                 * @param message RangeFilterDescription message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: movies.filters.v1.IRangeFilterDescription, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified RangeFilterDescription message, length delimited. Does not implicitly {@link movies.filters.v1.RangeFilterDescription.verify|verify} messages.
                 * @param message RangeFilterDescription message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: movies.filters.v1.IRangeFilterDescription, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a RangeFilterDescription message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns RangeFilterDescription
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): movies.filters.v1.RangeFilterDescription;

                /**
                 * Decodes a RangeFilterDescription message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns RangeFilterDescription
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): movies.filters.v1.RangeFilterDescription;

                /**
                 * Verifies a RangeFilterDescription message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a RangeFilterDescription message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns RangeFilterDescription
                 */
                public static fromObject(object: { [k: string]: any }): movies.filters.v1.RangeFilterDescription;

                /**
                 * Creates a plain object from a RangeFilterDescription message. Also converts values to other types if specified.
                 * @param message RangeFilterDescription
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: movies.filters.v1.RangeFilterDescription, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this RangeFilterDescription to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            namespace RangeFilterDescription {

                /** Properties of a List. */
                interface IList {

                    /** List items */
                    items?: (number[]|null);
                }

                /** Represents a List. */
                class List implements IList {

                    /**
                     * Constructs a new List.
                     * @param [properties] Properties to set
                     */
                    constructor(properties?: movies.filters.v1.RangeFilterDescription.IList);

                    /** List items. */
                    public items: number[];

                    /**
                     * Creates a new List instance using the specified properties.
                     * @param [properties] Properties to set
                     * @returns List instance
                     */
                    public static create(properties?: movies.filters.v1.RangeFilterDescription.IList): movies.filters.v1.RangeFilterDescription.List;

                    /**
                     * Encodes the specified List message. Does not implicitly {@link movies.filters.v1.RangeFilterDescription.List.verify|verify} messages.
                     * @param message List message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encode(message: movies.filters.v1.RangeFilterDescription.IList, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Encodes the specified List message, length delimited. Does not implicitly {@link movies.filters.v1.RangeFilterDescription.List.verify|verify} messages.
                     * @param message List message or plain object to encode
                     * @param [writer] Writer to encode to
                     * @returns Writer
                     */
                    public static encodeDelimited(message: movies.filters.v1.RangeFilterDescription.IList, writer?: $protobuf.Writer): $protobuf.Writer;

                    /**
                     * Decodes a List message from the specified reader or buffer.
                     * @param reader Reader or buffer to decode from
                     * @param [length] Message length if known beforehand
                     * @returns List
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): movies.filters.v1.RangeFilterDescription.List;

                    /**
                     * Decodes a List message from the specified reader or buffer, length delimited.
                     * @param reader Reader or buffer to decode from
                     * @returns List
                     * @throws {Error} If the payload is not a reader or valid buffer
                     * @throws {$protobuf.util.ProtocolError} If required fields are missing
                     */
                    public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): movies.filters.v1.RangeFilterDescription.List;

                    /**
                     * Verifies a List message.
                     * @param message Plain object to verify
                     * @returns `null` if valid, otherwise the reason why it is not
                     */
                    public static verify(message: { [k: string]: any }): (string|null);

                    /**
                     * Creates a List message from a plain object. Also converts values to their respective internal types.
                     * @param object Plain object
                     * @returns List
                     */
                    public static fromObject(object: { [k: string]: any }): movies.filters.v1.RangeFilterDescription.List;

                    /**
                     * Creates a plain object from a List message. Also converts values to other types if specified.
                     * @param message List
                     * @param [options] Conversion options
                     * @returns Plain object
                     */
                    public static toObject(message: movies.filters.v1.RangeFilterDescription.List, options?: $protobuf.IConversionOptions): { [k: string]: any };

                    /**
                     * Converts this List to JSON.
                     * @returns JSON object
                     */
                    public toJSON(): { [k: string]: any };
                }
            }

            /** Properties of a TokensFilterDescription. */
            interface ITokensFilterDescription {

                /** TokensFilterDescription values */
                values?: (string[]|null);
            }

            /** Represents a TokensFilterDescription. */
            class TokensFilterDescription implements ITokensFilterDescription {

                /**
                 * Constructs a new TokensFilterDescription.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: movies.filters.v1.ITokensFilterDescription);

                /** TokensFilterDescription values. */
                public values: string[];

                /**
                 * Creates a new TokensFilterDescription instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns TokensFilterDescription instance
                 */
                public static create(properties?: movies.filters.v1.ITokensFilterDescription): movies.filters.v1.TokensFilterDescription;

                /**
                 * Encodes the specified TokensFilterDescription message. Does not implicitly {@link movies.filters.v1.TokensFilterDescription.verify|verify} messages.
                 * @param message TokensFilterDescription message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: movies.filters.v1.ITokensFilterDescription, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified TokensFilterDescription message, length delimited. Does not implicitly {@link movies.filters.v1.TokensFilterDescription.verify|verify} messages.
                 * @param message TokensFilterDescription message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: movies.filters.v1.ITokensFilterDescription, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a TokensFilterDescription message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns TokensFilterDescription
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): movies.filters.v1.TokensFilterDescription;

                /**
                 * Decodes a TokensFilterDescription message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns TokensFilterDescription
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): movies.filters.v1.TokensFilterDescription;

                /**
                 * Verifies a TokensFilterDescription message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a TokensFilterDescription message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns TokensFilterDescription
                 */
                public static fromObject(object: { [k: string]: any }): movies.filters.v1.TokensFilterDescription;

                /**
                 * Creates a plain object from a TokensFilterDescription message. Also converts values to other types if specified.
                 * @param message TokensFilterDescription
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: movies.filters.v1.TokensFilterDescription, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this TokensFilterDescription to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of an OnOffFilterDescription. */
            interface IOnOffFilterDescription {

                /** OnOffFilterDescription defaultValue */
                defaultValue?: (boolean|null);
            }

            /** Represents an OnOffFilterDescription. */
            class OnOffFilterDescription implements IOnOffFilterDescription {

                /**
                 * Constructs a new OnOffFilterDescription.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: movies.filters.v1.IOnOffFilterDescription);

                /** OnOffFilterDescription defaultValue. */
                public defaultValue: boolean;

                /**
                 * Creates a new OnOffFilterDescription instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns OnOffFilterDescription instance
                 */
                public static create(properties?: movies.filters.v1.IOnOffFilterDescription): movies.filters.v1.OnOffFilterDescription;

                /**
                 * Encodes the specified OnOffFilterDescription message. Does not implicitly {@link movies.filters.v1.OnOffFilterDescription.verify|verify} messages.
                 * @param message OnOffFilterDescription message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: movies.filters.v1.IOnOffFilterDescription, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified OnOffFilterDescription message, length delimited. Does not implicitly {@link movies.filters.v1.OnOffFilterDescription.verify|verify} messages.
                 * @param message OnOffFilterDescription message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: movies.filters.v1.IOnOffFilterDescription, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an OnOffFilterDescription message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns OnOffFilterDescription
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): movies.filters.v1.OnOffFilterDescription;

                /**
                 * Decodes an OnOffFilterDescription message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns OnOffFilterDescription
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): movies.filters.v1.OnOffFilterDescription;

                /**
                 * Verifies an OnOffFilterDescription message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an OnOffFilterDescription message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns OnOffFilterDescription
                 */
                public static fromObject(object: { [k: string]: any }): movies.filters.v1.OnOffFilterDescription;

                /**
                 * Creates a plain object from an OnOffFilterDescription message. Also converts values to other types if specified.
                 * @param message OnOffFilterDescription
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: movies.filters.v1.OnOffFilterDescription, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this OnOffFilterDescription to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a FilterDescription. */
            interface IFilterDescription {

                /** FilterDescription id */
                id?: (movies.filters.v1.IDescriptionId|null);

                /** FilterDescription range */
                range?: (movies.filters.v1.IRangeFilterDescription|null);

                /** FilterDescription tokens */
                tokens?: (movies.filters.v1.ITokensFilterDescription|null);

                /** FilterDescription onOff */
                onOff?: (movies.filters.v1.IOnOffFilterDescription|null);
            }

            /** Represents a FilterDescription. */
            class FilterDescription implements IFilterDescription {

                /**
                 * Constructs a new FilterDescription.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: movies.filters.v1.IFilterDescription);

                /** FilterDescription id. */
                public id?: (movies.filters.v1.IDescriptionId|null);

                /** FilterDescription range. */
                public range?: (movies.filters.v1.IRangeFilterDescription|null);

                /** FilterDescription tokens. */
                public tokens?: (movies.filters.v1.ITokensFilterDescription|null);

                /** FilterDescription onOff. */
                public onOff?: (movies.filters.v1.IOnOffFilterDescription|null);

                /** FilterDescription kind. */
                public kind?: ("range"|"tokens"|"onOff");

                /**
                 * Creates a new FilterDescription instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns FilterDescription instance
                 */
                public static create(properties?: movies.filters.v1.IFilterDescription): movies.filters.v1.FilterDescription;

                /**
                 * Encodes the specified FilterDescription message. Does not implicitly {@link movies.filters.v1.FilterDescription.verify|verify} messages.
                 * @param message FilterDescription message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: movies.filters.v1.IFilterDescription, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified FilterDescription message, length delimited. Does not implicitly {@link movies.filters.v1.FilterDescription.verify|verify} messages.
                 * @param message FilterDescription message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: movies.filters.v1.IFilterDescription, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a FilterDescription message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns FilterDescription
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): movies.filters.v1.FilterDescription;

                /**
                 * Decodes a FilterDescription message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns FilterDescription
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): movies.filters.v1.FilterDescription;

                /**
                 * Verifies a FilterDescription message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a FilterDescription message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns FilterDescription
                 */
                public static fromObject(object: { [k: string]: any }): movies.filters.v1.FilterDescription;

                /**
                 * Creates a plain object from a FilterDescription message. Also converts values to other types if specified.
                 * @param message FilterDescription
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: movies.filters.v1.FilterDescription, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this FilterDescription to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a SortDescription. */
            interface ISortDescription {

                /** SortDescription id */
                id?: (movies.filters.v1.IDescriptionId|null);

                /** SortDescription ascByDefault */
                ascByDefault?: (boolean|null);
            }

            /** Represents a SortDescription. */
            class SortDescription implements ISortDescription {

                /**
                 * Constructs a new SortDescription.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: movies.filters.v1.ISortDescription);

                /** SortDescription id. */
                public id?: (movies.filters.v1.IDescriptionId|null);

                /** SortDescription ascByDefault. */
                public ascByDefault?: (boolean|null);

                /** SortDescription _ascByDefault. */
                public _ascByDefault?: "ascByDefault";

                /**
                 * Creates a new SortDescription instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns SortDescription instance
                 */
                public static create(properties?: movies.filters.v1.ISortDescription): movies.filters.v1.SortDescription;

                /**
                 * Encodes the specified SortDescription message. Does not implicitly {@link movies.filters.v1.SortDescription.verify|verify} messages.
                 * @param message SortDescription message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: movies.filters.v1.ISortDescription, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified SortDescription message, length delimited. Does not implicitly {@link movies.filters.v1.SortDescription.verify|verify} messages.
                 * @param message SortDescription message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: movies.filters.v1.ISortDescription, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a SortDescription message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns SortDescription
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): movies.filters.v1.SortDescription;

                /**
                 * Decodes a SortDescription message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns SortDescription
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): movies.filters.v1.SortDescription;

                /**
                 * Verifies a SortDescription message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a SortDescription message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns SortDescription
                 */
                public static fromObject(object: { [k: string]: any }): movies.filters.v1.SortDescription;

                /**
                 * Creates a plain object from a SortDescription message. Also converts values to other types if specified.
                 * @param message SortDescription
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: movies.filters.v1.SortDescription, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this SortDescription to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }
    }

    /** Namespace info. */
    namespace info {

        /** Namespace v1. */
        namespace v1 {

            /** Properties of a MovieReference. */
            interface IMovieReference {

                /** MovieReference id */
                id?: (string|null);

                /** MovieReference pos */
                pos?: (number|null);

                /** MovieReference title */
                title?: (string|null);

                /** MovieReference cover */
                cover?: (string|null);

                /** MovieReference hasVideo */
                hasVideo?: (boolean|null);

                /** MovieReference tags */
                tags?: (string[]|null);

                /** MovieReference ageRating */
                ageRating?: (string[]|null);

                /** MovieReference sortHint */
                sortHint?: (string|null);
            }

            /** Represents a MovieReference. */
            class MovieReference implements IMovieReference {

                /**
                 * Constructs a new MovieReference.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: movies.info.v1.IMovieReference);

                /** MovieReference id. */
                public id: string;

                /** MovieReference pos. */
                public pos?: (number|null);

                /** MovieReference title. */
                public title?: (string|null);

                /** MovieReference cover. */
                public cover?: (string|null);

                /** MovieReference hasVideo. */
                public hasVideo?: (boolean|null);

                /** MovieReference tags. */
                public tags: string[];

                /** MovieReference ageRating. */
                public ageRating: string[];

                /** MovieReference sortHint. */
                public sortHint: string;

                /** MovieReference _pos. */
                public _pos?: "pos";

                /** MovieReference _title. */
                public _title?: "title";

                /** MovieReference _cover. */
                public _cover?: "cover";

                /** MovieReference _hasVideo. */
                public _hasVideo?: "hasVideo";

                /**
                 * Creates a new MovieReference instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns MovieReference instance
                 */
                public static create(properties?: movies.info.v1.IMovieReference): movies.info.v1.MovieReference;

                /**
                 * Encodes the specified MovieReference message. Does not implicitly {@link movies.info.v1.MovieReference.verify|verify} messages.
                 * @param message MovieReference message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: movies.info.v1.IMovieReference, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified MovieReference message, length delimited. Does not implicitly {@link movies.info.v1.MovieReference.verify|verify} messages.
                 * @param message MovieReference message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: movies.info.v1.IMovieReference, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a MovieReference message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns MovieReference
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): movies.info.v1.MovieReference;

                /**
                 * Decodes a MovieReference message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns MovieReference
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): movies.info.v1.MovieReference;

                /**
                 * Verifies a MovieReference message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a MovieReference message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns MovieReference
                 */
                public static fromObject(object: { [k: string]: any }): movies.info.v1.MovieReference;

                /**
                 * Creates a plain object from a MovieReference message. Also converts values to other types if specified.
                 * @param message MovieReference
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: movies.info.v1.MovieReference, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this MovieReference to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a MovieGroup. */
            interface IMovieGroup {

                /** MovieGroup id */
                id?: (string|null);

                /** MovieGroup title */
                title?: (string|null);

                /** MovieGroup items */
                items?: (movies.info.v1.IMovieReference[]|null);

                /** MovieGroup pos */
                pos?: (number|null);
            }

            /** Represents a MovieGroup. */
            class MovieGroup implements IMovieGroup {

                /**
                 * Constructs a new MovieGroup.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: movies.info.v1.IMovieGroup);

                /** MovieGroup id. */
                public id: string;

                /** MovieGroup title. */
                public title?: (string|null);

                /** MovieGroup items. */
                public items: movies.info.v1.IMovieReference[];

                /** MovieGroup pos. */
                public pos?: (number|null);

                /** MovieGroup _title. */
                public _title?: "title";

                /** MovieGroup _pos. */
                public _pos?: "pos";

                /**
                 * Creates a new MovieGroup instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns MovieGroup instance
                 */
                public static create(properties?: movies.info.v1.IMovieGroup): movies.info.v1.MovieGroup;

                /**
                 * Encodes the specified MovieGroup message. Does not implicitly {@link movies.info.v1.MovieGroup.verify|verify} messages.
                 * @param message MovieGroup message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: movies.info.v1.IMovieGroup, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified MovieGroup message, length delimited. Does not implicitly {@link movies.info.v1.MovieGroup.verify|verify} messages.
                 * @param message MovieGroup message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: movies.info.v1.IMovieGroup, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a MovieGroup message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns MovieGroup
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): movies.info.v1.MovieGroup;

                /**
                 * Decodes a MovieGroup message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns MovieGroup
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): movies.info.v1.MovieGroup;

                /**
                 * Verifies a MovieGroup message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a MovieGroup message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns MovieGroup
                 */
                public static fromObject(object: { [k: string]: any }): movies.info.v1.MovieGroup;

                /**
                 * Creates a plain object from a MovieGroup message. Also converts values to other types if specified.
                 * @param message MovieGroup
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: movies.info.v1.MovieGroup, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this MovieGroup to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a MovieInfo. */
            interface IMovieInfo {

                /** MovieInfo id */
                id?: (string|null);

                /** MovieInfo hasVideo */
                hasVideo?: (boolean|null);

                /** MovieInfo title */
                title?: (movies.info.v1.ITitleInfo|null);

                /** MovieInfo crew */
                crew?: (movies.info.v1.ICrewInfo|null);

                /** MovieInfo people */
                people?: (movies.info.v1.IPeopleMap[]|null);

                /** MovieInfo links */
                links?: (movies.info.v1.ILink[]|null);

                /** MovieInfo genres */
                genres?: (string[]|null);

                /** MovieInfo countries */
                countries?: (string[]|null);

                /** MovieInfo ageRating */
                ageRating?: (string[]|null);

                /** MovieInfo tags */
                tags?: (string[]|null);

                /** MovieInfo episodes */
                episodes?: (movies.info.v1.IMovieReference[]|null);

                /** MovieInfo summary */
                summary?: (string|null);

                /** MovieInfo image */
                image?: (movies.info.v1.IImageInfo|null);

                /** MovieInfo year */
                year?: (number|null);

                /** MovieInfo runtime */
                runtime?: (number|null);

                /** MovieInfo rating */
                rating?: (number|null);
            }

            /** Represents a MovieInfo. */
            class MovieInfo implements IMovieInfo {

                /**
                 * Constructs a new MovieInfo.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: movies.info.v1.IMovieInfo);

                /** MovieInfo id. */
                public id: string;

                /** MovieInfo hasVideo. */
                public hasVideo: boolean;

                /** MovieInfo title. */
                public title?: (movies.info.v1.ITitleInfo|null);

                /** MovieInfo crew. */
                public crew?: (movies.info.v1.ICrewInfo|null);

                /** MovieInfo people. */
                public people: movies.info.v1.IPeopleMap[];

                /** MovieInfo links. */
                public links: movies.info.v1.ILink[];

                /** MovieInfo genres. */
                public genres: string[];

                /** MovieInfo countries. */
                public countries: string[];

                /** MovieInfo ageRating. */
                public ageRating: string[];

                /** MovieInfo tags. */
                public tags: string[];

                /** MovieInfo episodes. */
                public episodes: movies.info.v1.IMovieReference[];

                /** MovieInfo summary. */
                public summary?: (string|null);

                /** MovieInfo image. */
                public image?: (movies.info.v1.IImageInfo|null);

                /** MovieInfo year. */
                public year?: (number|null);

                /** MovieInfo runtime. */
                public runtime?: (number|null);

                /** MovieInfo rating. */
                public rating?: (number|null);

                /** MovieInfo _summary. */
                public _summary?: "summary";

                /** MovieInfo _year. */
                public _year?: "year";

                /** MovieInfo _runtime. */
                public _runtime?: "runtime";

                /** MovieInfo _rating. */
                public _rating?: "rating";

                /**
                 * Creates a new MovieInfo instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns MovieInfo instance
                 */
                public static create(properties?: movies.info.v1.IMovieInfo): movies.info.v1.MovieInfo;

                /**
                 * Encodes the specified MovieInfo message. Does not implicitly {@link movies.info.v1.MovieInfo.verify|verify} messages.
                 * @param message MovieInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: movies.info.v1.IMovieInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified MovieInfo message, length delimited. Does not implicitly {@link movies.info.v1.MovieInfo.verify|verify} messages.
                 * @param message MovieInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: movies.info.v1.IMovieInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a MovieInfo message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns MovieInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): movies.info.v1.MovieInfo;

                /**
                 * Decodes a MovieInfo message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns MovieInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): movies.info.v1.MovieInfo;

                /**
                 * Verifies a MovieInfo message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a MovieInfo message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns MovieInfo
                 */
                public static fromObject(object: { [k: string]: any }): movies.info.v1.MovieInfo;

                /**
                 * Creates a plain object from a MovieInfo message. Also converts values to other types if specified.
                 * @param message MovieInfo
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: movies.info.v1.MovieInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this MovieInfo to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a TitleInfo. */
            interface ITitleInfo {

                /** TitleInfo local */
                local?: (string|null);

                /** TitleInfo orig */
                orig?: (string|null);
            }

            /** Represents a TitleInfo. */
            class TitleInfo implements ITitleInfo {

                /**
                 * Constructs a new TitleInfo.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: movies.info.v1.ITitleInfo);

                /** TitleInfo local. */
                public local?: (string|null);

                /** TitleInfo orig. */
                public orig?: (string|null);

                /** TitleInfo _local. */
                public _local?: "local";

                /** TitleInfo _orig. */
                public _orig?: "orig";

                /**
                 * Creates a new TitleInfo instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns TitleInfo instance
                 */
                public static create(properties?: movies.info.v1.ITitleInfo): movies.info.v1.TitleInfo;

                /**
                 * Encodes the specified TitleInfo message. Does not implicitly {@link movies.info.v1.TitleInfo.verify|verify} messages.
                 * @param message TitleInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: movies.info.v1.ITitleInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified TitleInfo message, length delimited. Does not implicitly {@link movies.info.v1.TitleInfo.verify|verify} messages.
                 * @param message TitleInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: movies.info.v1.ITitleInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a TitleInfo message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns TitleInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): movies.info.v1.TitleInfo;

                /**
                 * Decodes a TitleInfo message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns TitleInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): movies.info.v1.TitleInfo;

                /**
                 * Verifies a TitleInfo message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a TitleInfo message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns TitleInfo
                 */
                public static fromObject(object: { [k: string]: any }): movies.info.v1.TitleInfo;

                /**
                 * Creates a plain object from a TitleInfo message. Also converts values to other types if specified.
                 * @param message TitleInfo
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: movies.info.v1.TitleInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this TitleInfo to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a CrewInfo. */
            interface ICrewInfo {

                /** CrewInfo directors */
                directors?: (movies.info.v1.IPersonInfo[]|null);

                /** CrewInfo writers */
                writers?: (movies.info.v1.IPersonInfo[]|null);

                /** CrewInfo cast */
                cast?: (movies.info.v1.IPersonInfo[]|null);
            }

            /** Represents a CrewInfo. */
            class CrewInfo implements ICrewInfo {

                /**
                 * Constructs a new CrewInfo.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: movies.info.v1.ICrewInfo);

                /** CrewInfo directors. */
                public directors: movies.info.v1.IPersonInfo[];

                /** CrewInfo writers. */
                public writers: movies.info.v1.IPersonInfo[];

                /** CrewInfo cast. */
                public cast: movies.info.v1.IPersonInfo[];

                /**
                 * Creates a new CrewInfo instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns CrewInfo instance
                 */
                public static create(properties?: movies.info.v1.ICrewInfo): movies.info.v1.CrewInfo;

                /**
                 * Encodes the specified CrewInfo message. Does not implicitly {@link movies.info.v1.CrewInfo.verify|verify} messages.
                 * @param message CrewInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: movies.info.v1.ICrewInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified CrewInfo message, length delimited. Does not implicitly {@link movies.info.v1.CrewInfo.verify|verify} messages.
                 * @param message CrewInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: movies.info.v1.ICrewInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a CrewInfo message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns CrewInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): movies.info.v1.CrewInfo;

                /**
                 * Decodes a CrewInfo message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns CrewInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): movies.info.v1.CrewInfo;

                /**
                 * Verifies a CrewInfo message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a CrewInfo message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns CrewInfo
                 */
                public static fromObject(object: { [k: string]: any }): movies.info.v1.CrewInfo;

                /**
                 * Creates a plain object from a CrewInfo message. Also converts values to other types if specified.
                 * @param message CrewInfo
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: movies.info.v1.CrewInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this CrewInfo to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a PersonInfo. */
            interface IPersonInfo {

                /** PersonInfo key */
                key?: (string|null);

                /** PersonInfo contribution */
                contribution?: (string|null);
            }

            /** Represents a PersonInfo. */
            class PersonInfo implements IPersonInfo {

                /**
                 * Constructs a new PersonInfo.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: movies.info.v1.IPersonInfo);

                /** PersonInfo key. */
                public key: string;

                /** PersonInfo contribution. */
                public contribution?: (string|null);

                /** PersonInfo _contribution. */
                public _contribution?: "contribution";

                /**
                 * Creates a new PersonInfo instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns PersonInfo instance
                 */
                public static create(properties?: movies.info.v1.IPersonInfo): movies.info.v1.PersonInfo;

                /**
                 * Encodes the specified PersonInfo message. Does not implicitly {@link movies.info.v1.PersonInfo.verify|verify} messages.
                 * @param message PersonInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: movies.info.v1.IPersonInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified PersonInfo message, length delimited. Does not implicitly {@link movies.info.v1.PersonInfo.verify|verify} messages.
                 * @param message PersonInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: movies.info.v1.IPersonInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a PersonInfo message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns PersonInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): movies.info.v1.PersonInfo;

                /**
                 * Decodes a PersonInfo message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns PersonInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): movies.info.v1.PersonInfo;

                /**
                 * Verifies a PersonInfo message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a PersonInfo message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns PersonInfo
                 */
                public static fromObject(object: { [k: string]: any }): movies.info.v1.PersonInfo;

                /**
                 * Creates a plain object from a PersonInfo message. Also converts values to other types if specified.
                 * @param message PersonInfo
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: movies.info.v1.PersonInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this PersonInfo to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a PeopleMap. */
            interface IPeopleMap {

                /** PeopleMap key */
                key?: (string|null);

                /** PeopleMap name */
                name?: (string|null);
            }

            /** Represents a PeopleMap. */
            class PeopleMap implements IPeopleMap {

                /**
                 * Constructs a new PeopleMap.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: movies.info.v1.IPeopleMap);

                /** PeopleMap key. */
                public key: string;

                /** PeopleMap name. */
                public name: string;

                /**
                 * Creates a new PeopleMap instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns PeopleMap instance
                 */
                public static create(properties?: movies.info.v1.IPeopleMap): movies.info.v1.PeopleMap;

                /**
                 * Encodes the specified PeopleMap message. Does not implicitly {@link movies.info.v1.PeopleMap.verify|verify} messages.
                 * @param message PeopleMap message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: movies.info.v1.IPeopleMap, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified PeopleMap message, length delimited. Does not implicitly {@link movies.info.v1.PeopleMap.verify|verify} messages.
                 * @param message PeopleMap message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: movies.info.v1.IPeopleMap, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a PeopleMap message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns PeopleMap
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): movies.info.v1.PeopleMap;

                /**
                 * Decodes a PeopleMap message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns PeopleMap
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): movies.info.v1.PeopleMap;

                /**
                 * Verifies a PeopleMap message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a PeopleMap message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns PeopleMap
                 */
                public static fromObject(object: { [k: string]: any }): movies.info.v1.PeopleMap;

                /**
                 * Creates a plain object from a PeopleMap message. Also converts values to other types if specified.
                 * @param message PeopleMap
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: movies.info.v1.PeopleMap, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this PeopleMap to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a Link. */
            interface ILink {

                /** Link href */
                href?: (string|null);

                /** Link icon */
                icon?: (string|null);

                /** Link label */
                label?: (string|null);

                /** Link alt */
                alt?: (string|null);

                /** Link rel */
                rel?: (string|null);
            }

            /** Represents a Link. */
            class Link implements ILink {

                /**
                 * Constructs a new Link.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: movies.info.v1.ILink);

                /** Link href. */
                public href: string;

                /** Link icon. */
                public icon?: (string|null);

                /** Link label. */
                public label?: (string|null);

                /** Link alt. */
                public alt?: (string|null);

                /** Link rel. */
                public rel?: (string|null);

                /** Link _icon. */
                public _icon?: "icon";

                /** Link _label. */
                public _label?: "label";

                /** Link _alt. */
                public _alt?: "alt";

                /** Link _rel. */
                public _rel?: "rel";

                /**
                 * Creates a new Link instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Link instance
                 */
                public static create(properties?: movies.info.v1.ILink): movies.info.v1.Link;

                /**
                 * Encodes the specified Link message. Does not implicitly {@link movies.info.v1.Link.verify|verify} messages.
                 * @param message Link message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: movies.info.v1.ILink, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Link message, length delimited. Does not implicitly {@link movies.info.v1.Link.verify|verify} messages.
                 * @param message Link message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: movies.info.v1.ILink, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Link message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Link
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): movies.info.v1.Link;

                /**
                 * Decodes a Link message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Link
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): movies.info.v1.Link;

                /**
                 * Verifies a Link message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Link message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Link
                 */
                public static fromObject(object: { [k: string]: any }): movies.info.v1.Link;

                /**
                 * Creates a plain object from a Link message. Also converts values to other types if specified.
                 * @param message Link
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: movies.info.v1.Link, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Link to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of an ImageInfo. */
            interface IImageInfo {

                /** ImageInfo highlight */
                highlight?: (string|null);

                /** ImageInfo poster */
                poster?: (movies.info.v1.IPosterInfo|null);

                /** ImageInfo gallery */
                gallery?: (string[]|null);
            }

            /** Represents an ImageInfo. */
            class ImageInfo implements IImageInfo {

                /**
                 * Constructs a new ImageInfo.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: movies.info.v1.IImageInfo);

                /** ImageInfo highlight. */
                public highlight?: (string|null);

                /** ImageInfo poster. */
                public poster?: (movies.info.v1.IPosterInfo|null);

                /** ImageInfo gallery. */
                public gallery: string[];

                /** ImageInfo _highlight. */
                public _highlight?: "highlight";

                /**
                 * Creates a new ImageInfo instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns ImageInfo instance
                 */
                public static create(properties?: movies.info.v1.IImageInfo): movies.info.v1.ImageInfo;

                /**
                 * Encodes the specified ImageInfo message. Does not implicitly {@link movies.info.v1.ImageInfo.verify|verify} messages.
                 * @param message ImageInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: movies.info.v1.IImageInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified ImageInfo message, length delimited. Does not implicitly {@link movies.info.v1.ImageInfo.verify|verify} messages.
                 * @param message ImageInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: movies.info.v1.IImageInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an ImageInfo message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns ImageInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): movies.info.v1.ImageInfo;

                /**
                 * Decodes an ImageInfo message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns ImageInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): movies.info.v1.ImageInfo;

                /**
                 * Verifies an ImageInfo message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an ImageInfo message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns ImageInfo
                 */
                public static fromObject(object: { [k: string]: any }): movies.info.v1.ImageInfo;

                /**
                 * Creates a plain object from an ImageInfo message. Also converts values to other types if specified.
                 * @param message ImageInfo
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: movies.info.v1.ImageInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this ImageInfo to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a PosterInfo. */
            interface IPosterInfo {

                /** PosterInfo small */
                small?: (string|null);

                /** PosterInfo large */
                large?: (string|null);

                /** PosterInfo normal */
                normal?: (string|null);
            }

            /** Represents a PosterInfo. */
            class PosterInfo implements IPosterInfo {

                /**
                 * Constructs a new PosterInfo.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: movies.info.v1.IPosterInfo);

                /** PosterInfo small. */
                public small?: (string|null);

                /** PosterInfo large. */
                public large?: (string|null);

                /** PosterInfo normal. */
                public normal?: (string|null);

                /** PosterInfo _small. */
                public _small?: "small";

                /** PosterInfo _large. */
                public _large?: "large";

                /** PosterInfo _normal. */
                public _normal?: "normal";

                /**
                 * Creates a new PosterInfo instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns PosterInfo instance
                 */
                public static create(properties?: movies.info.v1.IPosterInfo): movies.info.v1.PosterInfo;

                /**
                 * Encodes the specified PosterInfo message. Does not implicitly {@link movies.info.v1.PosterInfo.verify|verify} messages.
                 * @param message PosterInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: movies.info.v1.IPosterInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified PosterInfo message, length delimited. Does not implicitly {@link movies.info.v1.PosterInfo.verify|verify} messages.
                 * @param message PosterInfo message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: movies.info.v1.IPosterInfo, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a PosterInfo message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns PosterInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): movies.info.v1.PosterInfo;

                /**
                 * Decodes a PosterInfo message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns PosterInfo
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): movies.info.v1.PosterInfo;

                /**
                 * Verifies a PosterInfo message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a PosterInfo message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns PosterInfo
                 */
                public static fromObject(object: { [k: string]: any }): movies.info.v1.PosterInfo;

                /**
                 * Creates a plain object from a PosterInfo message. Also converts values to other types if specified.
                 * @param message PosterInfo
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: movies.info.v1.PosterInfo, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this PosterInfo to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }
    }

    /** Namespace listing. */
    namespace listing {

        /** Namespace v1. */
        namespace v1 {

            /** Properties of a MovieReference. */
            interface IMovieReference {

                /** MovieReference id */
                id?: (string|null);

                /** MovieReference pos */
                pos?: (number|null);

                /** MovieReference title */
                title?: (string|null);

                /** MovieReference cover */
                cover?: (string|null);

                /** MovieReference hasVideo */
                hasVideo?: (boolean|null);

                /** MovieReference tags */
                tags?: (string[]|null);

                /** MovieReference ageRating */
                ageRating?: (string[]|null);

                /** MovieReference sortHint */
                sortHint?: (string|null);
            }

            /** Represents a MovieReference. */
            class MovieReference implements IMovieReference {

                /**
                 * Constructs a new MovieReference.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: movies.listing.v1.IMovieReference);

                /** MovieReference id. */
                public id: string;

                /** MovieReference pos. */
                public pos?: (number|null);

                /** MovieReference title. */
                public title?: (string|null);

                /** MovieReference cover. */
                public cover?: (string|null);

                /** MovieReference hasVideo. */
                public hasVideo?: (boolean|null);

                /** MovieReference tags. */
                public tags: string[];

                /** MovieReference ageRating. */
                public ageRating: string[];

                /** MovieReference sortHint. */
                public sortHint: string;

                /** MovieReference _pos. */
                public _pos?: "pos";

                /** MovieReference _title. */
                public _title?: "title";

                /** MovieReference _cover. */
                public _cover?: "cover";

                /** MovieReference _hasVideo. */
                public _hasVideo?: "hasVideo";

                /**
                 * Creates a new MovieReference instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns MovieReference instance
                 */
                public static create(properties?: movies.listing.v1.IMovieReference): movies.listing.v1.MovieReference;

                /**
                 * Encodes the specified MovieReference message. Does not implicitly {@link movies.listing.v1.MovieReference.verify|verify} messages.
                 * @param message MovieReference message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: movies.listing.v1.IMovieReference, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified MovieReference message, length delimited. Does not implicitly {@link movies.listing.v1.MovieReference.verify|verify} messages.
                 * @param message MovieReference message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: movies.listing.v1.IMovieReference, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a MovieReference message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns MovieReference
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): movies.listing.v1.MovieReference;

                /**
                 * Decodes a MovieReference message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns MovieReference
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): movies.listing.v1.MovieReference;

                /**
                 * Verifies a MovieReference message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a MovieReference message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns MovieReference
                 */
                public static fromObject(object: { [k: string]: any }): movies.listing.v1.MovieReference;

                /**
                 * Creates a plain object from a MovieReference message. Also converts values to other types if specified.
                 * @param message MovieReference
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: movies.listing.v1.MovieReference, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this MovieReference to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a MovieGroup. */
            interface IMovieGroup {

                /** MovieGroup id */
                id?: (string|null);

                /** MovieGroup title */
                title?: (string|null);

                /** MovieGroup items */
                items?: (movies.listing.v1.IMovieReference[]|null);

                /** MovieGroup pos */
                pos?: (number|null);
            }

            /** Represents a MovieGroup. */
            class MovieGroup implements IMovieGroup {

                /**
                 * Constructs a new MovieGroup.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: movies.listing.v1.IMovieGroup);

                /** MovieGroup id. */
                public id: string;

                /** MovieGroup title. */
                public title?: (string|null);

                /** MovieGroup items. */
                public items: movies.listing.v1.IMovieReference[];

                /** MovieGroup pos. */
                public pos?: (number|null);

                /** MovieGroup _title. */
                public _title?: "title";

                /** MovieGroup _pos. */
                public _pos?: "pos";

                /**
                 * Creates a new MovieGroup instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns MovieGroup instance
                 */
                public static create(properties?: movies.listing.v1.IMovieGroup): movies.listing.v1.MovieGroup;

                /**
                 * Encodes the specified MovieGroup message. Does not implicitly {@link movies.listing.v1.MovieGroup.verify|verify} messages.
                 * @param message MovieGroup message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: movies.listing.v1.IMovieGroup, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified MovieGroup message, length delimited. Does not implicitly {@link movies.listing.v1.MovieGroup.verify|verify} messages.
                 * @param message MovieGroup message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: movies.listing.v1.IMovieGroup, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a MovieGroup message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns MovieGroup
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): movies.listing.v1.MovieGroup;

                /**
                 * Decodes a MovieGroup message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns MovieGroup
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): movies.listing.v1.MovieGroup;

                /**
                 * Verifies a MovieGroup message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a MovieGroup message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns MovieGroup
                 */
                public static fromObject(object: { [k: string]: any }): movies.listing.v1.MovieGroup;

                /**
                 * Creates a plain object from a MovieGroup message. Also converts values to other types if specified.
                 * @param message MovieGroup
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: movies.listing.v1.MovieGroup, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this MovieGroup to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }
    }

    /** Namespace rpc. */
    namespace rpc {

        /** Namespace v1. */
        namespace v1 {

            /** Properties of an Event. */
            interface IEvent {

                /** Event id */
                id?: (number|null);

                /** Event listingReponseChanged */
                listingReponseChanged?: (movies.db.v1.IListingResponseChangedEvent|null);

                /** Event movieInfoChanged */
                movieInfoChanged?: (movies.db.v1.IMovieInfoChangedEvent|null);
            }

            /** Represents an Event. */
            class Event implements IEvent {

                /**
                 * Constructs a new Event.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: movies.rpc.v1.IEvent);

                /** Event id. */
                public id: number;

                /** Event listingReponseChanged. */
                public listingReponseChanged?: (movies.db.v1.IListingResponseChangedEvent|null);

                /** Event movieInfoChanged. */
                public movieInfoChanged?: (movies.db.v1.IMovieInfoChangedEvent|null);

                /** Event message. */
                public message?: ("listingReponseChanged"|"movieInfoChanged");

                /**
                 * Creates a new Event instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Event instance
                 */
                public static create(properties?: movies.rpc.v1.IEvent): movies.rpc.v1.Event;

                /**
                 * Encodes the specified Event message. Does not implicitly {@link movies.rpc.v1.Event.verify|verify} messages.
                 * @param message Event message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: movies.rpc.v1.IEvent, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Event message, length delimited. Does not implicitly {@link movies.rpc.v1.Event.verify|verify} messages.
                 * @param message Event message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: movies.rpc.v1.IEvent, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes an Event message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Event
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): movies.rpc.v1.Event;

                /**
                 * Decodes an Event message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Event
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): movies.rpc.v1.Event;

                /**
                 * Verifies an Event message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates an Event message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Event
                 */
                public static fromObject(object: { [k: string]: any }): movies.rpc.v1.Event;

                /**
                 * Creates a plain object from an Event message. Also converts values to other types if specified.
                 * @param message Event
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: movies.rpc.v1.Event, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Event to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a Request. */
            interface IRequest {

                /** Request id */
                id?: (number|null);

                /** Request langChange */
                langChange?: (movies.ui.v1.ILangChangeRequest|null);

                /** Request getConfig */
                getConfig?: (movies.ui.v1.IGetConfigRequest|null);

                /** Request getListing */
                getListing?: (movies.db.v1.IGetListingRequest|null);

                /** Request getMovieInfo */
                getMovieInfo?: (movies.db.v1.IGetMovieInfoRequest|null);

                /** Request getVideoFile */
                getVideoFile?: (movies.db.v1.IGetVideoFileRequest|null);
            }

            /** Represents a Request. */
            class Request implements IRequest {

                /**
                 * Constructs a new Request.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: movies.rpc.v1.IRequest);

                /** Request id. */
                public id: number;

                /** Request langChange. */
                public langChange?: (movies.ui.v1.ILangChangeRequest|null);

                /** Request getConfig. */
                public getConfig?: (movies.ui.v1.IGetConfigRequest|null);

                /** Request getListing. */
                public getListing?: (movies.db.v1.IGetListingRequest|null);

                /** Request getMovieInfo. */
                public getMovieInfo?: (movies.db.v1.IGetMovieInfoRequest|null);

                /** Request getVideoFile. */
                public getVideoFile?: (movies.db.v1.IGetVideoFileRequest|null);

                /** Request message. */
                public message?: ("langChange"|"getConfig"|"getListing"|"getMovieInfo"|"getVideoFile");

                /**
                 * Creates a new Request instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Request instance
                 */
                public static create(properties?: movies.rpc.v1.IRequest): movies.rpc.v1.Request;

                /**
                 * Encodes the specified Request message. Does not implicitly {@link movies.rpc.v1.Request.verify|verify} messages.
                 * @param message Request message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: movies.rpc.v1.IRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Request message, length delimited. Does not implicitly {@link movies.rpc.v1.Request.verify|verify} messages.
                 * @param message Request message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: movies.rpc.v1.IRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Request message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Request
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): movies.rpc.v1.Request;

                /**
                 * Decodes a Request message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Request
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): movies.rpc.v1.Request;

                /**
                 * Verifies a Request message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Request message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Request
                 */
                public static fromObject(object: { [k: string]: any }): movies.rpc.v1.Request;

                /**
                 * Creates a plain object from a Request message. Also converts values to other types if specified.
                 * @param message Request
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: movies.rpc.v1.Request, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Request to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a Response. */
            interface IResponse {

                /** Response id */
                id?: (number|null);

                /** Response langChange */
                langChange?: (movies.ui.v1.ILangChangeResponse|null);

                /** Response getConfig */
                getConfig?: (movies.ui.v1.IGetConfigResponse|null);

                /** Response getListing */
                getListing?: (movies.db.v1.IGetListingResponse|null);

                /** Response getMovieInfo */
                getMovieInfo?: (movies.db.v1.IGetMovieInfoResponse|null);

                /** Response getVideoFile */
                getVideoFile?: (movies.db.v1.IGetVideoFileResponse|null);
            }

            /** Represents a Response. */
            class Response implements IResponse {

                /**
                 * Constructs a new Response.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: movies.rpc.v1.IResponse);

                /** Response id. */
                public id: number;

                /** Response langChange. */
                public langChange?: (movies.ui.v1.ILangChangeResponse|null);

                /** Response getConfig. */
                public getConfig?: (movies.ui.v1.IGetConfigResponse|null);

                /** Response getListing. */
                public getListing?: (movies.db.v1.IGetListingResponse|null);

                /** Response getMovieInfo. */
                public getMovieInfo?: (movies.db.v1.IGetMovieInfoResponse|null);

                /** Response getVideoFile. */
                public getVideoFile?: (movies.db.v1.IGetVideoFileResponse|null);

                /** Response message. */
                public message?: ("langChange"|"getConfig"|"getListing"|"getMovieInfo"|"getVideoFile");

                /**
                 * Creates a new Response instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns Response instance
                 */
                public static create(properties?: movies.rpc.v1.IResponse): movies.rpc.v1.Response;

                /**
                 * Encodes the specified Response message. Does not implicitly {@link movies.rpc.v1.Response.verify|verify} messages.
                 * @param message Response message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: movies.rpc.v1.IResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified Response message, length delimited. Does not implicitly {@link movies.rpc.v1.Response.verify|verify} messages.
                 * @param message Response message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: movies.rpc.v1.IResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a Response message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns Response
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): movies.rpc.v1.Response;

                /**
                 * Decodes a Response message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns Response
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): movies.rpc.v1.Response;

                /**
                 * Verifies a Response message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a Response message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns Response
                 */
                public static fromObject(object: { [k: string]: any }): movies.rpc.v1.Response;

                /**
                 * Creates a plain object from a Response message. Also converts values to other types if specified.
                 * @param message Response
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: movies.rpc.v1.Response, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this Response to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }
    }

    /** Namespace ui. */
    namespace ui {

        /** Namespace v1. */
        namespace v1 {

            /** Properties of a LangChangeRequest. */
            interface ILangChangeRequest {

                /** LangChangeRequest langId */
                langId?: (string[]|null);
            }

            /** Represents a LangChangeRequest. */
            class LangChangeRequest implements ILangChangeRequest {

                /**
                 * Constructs a new LangChangeRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: movies.ui.v1.ILangChangeRequest);

                /** LangChangeRequest langId. */
                public langId: string[];

                /**
                 * Creates a new LangChangeRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns LangChangeRequest instance
                 */
                public static create(properties?: movies.ui.v1.ILangChangeRequest): movies.ui.v1.LangChangeRequest;

                /**
                 * Encodes the specified LangChangeRequest message. Does not implicitly {@link movies.ui.v1.LangChangeRequest.verify|verify} messages.
                 * @param message LangChangeRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: movies.ui.v1.ILangChangeRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified LangChangeRequest message, length delimited. Does not implicitly {@link movies.ui.v1.LangChangeRequest.verify|verify} messages.
                 * @param message LangChangeRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: movies.ui.v1.ILangChangeRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a LangChangeRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns LangChangeRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): movies.ui.v1.LangChangeRequest;

                /**
                 * Decodes a LangChangeRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns LangChangeRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): movies.ui.v1.LangChangeRequest;

                /**
                 * Verifies a LangChangeRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a LangChangeRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns LangChangeRequest
                 */
                public static fromObject(object: { [k: string]: any }): movies.ui.v1.LangChangeRequest;

                /**
                 * Creates a plain object from a LangChangeRequest message. Also converts values to other types if specified.
                 * @param message LangChangeRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: movies.ui.v1.LangChangeRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this LangChangeRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a LangChangeResponse. */
            interface ILangChangeResponse {
            }

            /** Represents a LangChangeResponse. */
            class LangChangeResponse implements ILangChangeResponse {

                /**
                 * Constructs a new LangChangeResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: movies.ui.v1.ILangChangeResponse);

                /**
                 * Creates a new LangChangeResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns LangChangeResponse instance
                 */
                public static create(properties?: movies.ui.v1.ILangChangeResponse): movies.ui.v1.LangChangeResponse;

                /**
                 * Encodes the specified LangChangeResponse message. Does not implicitly {@link movies.ui.v1.LangChangeResponse.verify|verify} messages.
                 * @param message LangChangeResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: movies.ui.v1.ILangChangeResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified LangChangeResponse message, length delimited. Does not implicitly {@link movies.ui.v1.LangChangeResponse.verify|verify} messages.
                 * @param message LangChangeResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: movies.ui.v1.ILangChangeResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a LangChangeResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns LangChangeResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): movies.ui.v1.LangChangeResponse;

                /**
                 * Decodes a LangChangeResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns LangChangeResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): movies.ui.v1.LangChangeResponse;

                /**
                 * Verifies a LangChangeResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a LangChangeResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns LangChangeResponse
                 */
                public static fromObject(object: { [k: string]: any }): movies.ui.v1.LangChangeResponse;

                /**
                 * Creates a plain object from a LangChangeResponse message. Also converts values to other types if specified.
                 * @param message LangChangeResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: movies.ui.v1.LangChangeResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this LangChangeResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a GetConfigRequest. */
            interface IGetConfigRequest {
            }

            /** Represents a GetConfigRequest. */
            class GetConfigRequest implements IGetConfigRequest {

                /**
                 * Constructs a new GetConfigRequest.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: movies.ui.v1.IGetConfigRequest);

                /**
                 * Creates a new GetConfigRequest instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GetConfigRequest instance
                 */
                public static create(properties?: movies.ui.v1.IGetConfigRequest): movies.ui.v1.GetConfigRequest;

                /**
                 * Encodes the specified GetConfigRequest message. Does not implicitly {@link movies.ui.v1.GetConfigRequest.verify|verify} messages.
                 * @param message GetConfigRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: movies.ui.v1.IGetConfigRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GetConfigRequest message, length delimited. Does not implicitly {@link movies.ui.v1.GetConfigRequest.verify|verify} messages.
                 * @param message GetConfigRequest message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: movies.ui.v1.IGetConfigRequest, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GetConfigRequest message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GetConfigRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): movies.ui.v1.GetConfigRequest;

                /**
                 * Decodes a GetConfigRequest message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GetConfigRequest
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): movies.ui.v1.GetConfigRequest;

                /**
                 * Verifies a GetConfigRequest message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GetConfigRequest message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GetConfigRequest
                 */
                public static fromObject(object: { [k: string]: any }): movies.ui.v1.GetConfigRequest;

                /**
                 * Creates a plain object from a GetConfigRequest message. Also converts values to other types if specified.
                 * @param message GetConfigRequest
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: movies.ui.v1.GetConfigRequest, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GetConfigRequest to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }

            /** Properties of a GetConfigResponse. */
            interface IGetConfigResponse {

                /** GetConfigResponse filters */
                filters?: (movies.filters.v1.IFilterDescription[]|null);

                /** GetConfigResponse sort */
                sort?: (movies.filters.v1.ISortDescription[]|null);
            }

            /** Represents a GetConfigResponse. */
            class GetConfigResponse implements IGetConfigResponse {

                /**
                 * Constructs a new GetConfigResponse.
                 * @param [properties] Properties to set
                 */
                constructor(properties?: movies.ui.v1.IGetConfigResponse);

                /** GetConfigResponse filters. */
                public filters: movies.filters.v1.IFilterDescription[];

                /** GetConfigResponse sort. */
                public sort: movies.filters.v1.ISortDescription[];

                /**
                 * Creates a new GetConfigResponse instance using the specified properties.
                 * @param [properties] Properties to set
                 * @returns GetConfigResponse instance
                 */
                public static create(properties?: movies.ui.v1.IGetConfigResponse): movies.ui.v1.GetConfigResponse;

                /**
                 * Encodes the specified GetConfigResponse message. Does not implicitly {@link movies.ui.v1.GetConfigResponse.verify|verify} messages.
                 * @param message GetConfigResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encode(message: movies.ui.v1.IGetConfigResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Encodes the specified GetConfigResponse message, length delimited. Does not implicitly {@link movies.ui.v1.GetConfigResponse.verify|verify} messages.
                 * @param message GetConfigResponse message or plain object to encode
                 * @param [writer] Writer to encode to
                 * @returns Writer
                 */
                public static encodeDelimited(message: movies.ui.v1.IGetConfigResponse, writer?: $protobuf.Writer): $protobuf.Writer;

                /**
                 * Decodes a GetConfigResponse message from the specified reader or buffer.
                 * @param reader Reader or buffer to decode from
                 * @param [length] Message length if known beforehand
                 * @returns GetConfigResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): movies.ui.v1.GetConfigResponse;

                /**
                 * Decodes a GetConfigResponse message from the specified reader or buffer, length delimited.
                 * @param reader Reader or buffer to decode from
                 * @returns GetConfigResponse
                 * @throws {Error} If the payload is not a reader or valid buffer
                 * @throws {$protobuf.util.ProtocolError} If required fields are missing
                 */
                public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): movies.ui.v1.GetConfigResponse;

                /**
                 * Verifies a GetConfigResponse message.
                 * @param message Plain object to verify
                 * @returns `null` if valid, otherwise the reason why it is not
                 */
                public static verify(message: { [k: string]: any }): (string|null);

                /**
                 * Creates a GetConfigResponse message from a plain object. Also converts values to their respective internal types.
                 * @param object Plain object
                 * @returns GetConfigResponse
                 */
                public static fromObject(object: { [k: string]: any }): movies.ui.v1.GetConfigResponse;

                /**
                 * Creates a plain object from a GetConfigResponse message. Also converts values to other types if specified.
                 * @param message GetConfigResponse
                 * @param [options] Conversion options
                 * @returns Plain object
                 */
                public static toObject(message: movies.ui.v1.GetConfigResponse, options?: $protobuf.IConversionOptions): { [k: string]: any };

                /**
                 * Converts this GetConfigResponse to JSON.
                 * @returns JSON object
                 */
                public toJSON(): { [k: string]: any };
            }
        }
    }
}
