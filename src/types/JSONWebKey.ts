/**
 *
 */
export default interface JSONWebKey {
  /**
   * The \"alg\" (algorithm) parameter identifies the algorithm intended for use
   * with the key.  The values used should either be registered in the IANA
   * \"JSON Web Signature and Encryption Algorithms\" registry established by
   * [JWA] or be a value that contains a Collision- Resistant Name.
   */
  alg: string;

  /**
   *
   */
  crv?: string;

  /**
   *
   */
  d?: string;

  /**
   *
   */
  dp?: string;

  /**
   *
   */
  dq?: string;

  /**
   *
   */
  e?: string;

  /**
   *
   */
  k?: string;

  /**
   * The \"kid\" (key ID) parameter is used to match a specific key.  This is
   * used, for instance, to choose among a set of keys within a JWK Set during
   * key rollover.  The structure of the \"kid\" value is unspecified.  When
   * \"kid\" values are used within a JWK Set, different keys within the JWK Set
   * SHOULD use distinct \"kid\" values.  (One example in which different keys
   * might use the same \"kid\" value is if they have different \"kty\" (key
   * type) values but are considered to be equivalent alternatives by the
   * application using them.)  The \"kid\" value is a case-sensitive string.
   */
  kid: string;

  /**
   * The \"kty\" (key type) parameter identifies the cryptographic algorithm
   * family used with the key, such as \"RSA\" or \"EC\". \"kty\" values should
   * either be registered in the IANA \"JSON Web Key Types\" registry
   * established by [JWA] or be a value that contains a Collision- Resistant
   * Name.  The \"kty\" value is a case-sensitive string.
   */
  kty: string;

  /**
   *
   */
  n?: string;

  /**
   *
   */
  p?: string;

  /**
   *
   */
  q?: string;

  /**
   *
   */
  qi?: string;

  /**
   * Use (\"public key use\") identifies the intended use of the public key. The
   * \"use\" parameter is employed to indicate whether a public key is used for
   * encrypting data or verifying the signature on data. Values are commonly
   * \"sig\" (signature) or \"enc\" (encryption).
   */
  use: string;

  /**
   *
   */
  x?: string;

  /**
   * The \"x5c\" (X.509 certificate chain) parameter contains a chain of one or
   * more PKIX certificates [RFC5280].  The certificate chain is represented as
   * a JSON array of certificate value strings.  Each string in the array is a
   * base64-encoded (Section 4 of [RFC4648] -- not base64url-encoded) DER
   * [ITU.X690.1994] PKIX certificate value. The PKIX certificate containing the
   * key value MUST be the first certificate.
   */
  x5c?: string[];

  /**
   *
   */
  y?: string;
}