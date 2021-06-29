const alphabetSize = 256;

/**
 * Returns a function that checks against a provided string (Called a needle)
 * This function creates tables which are reused to check against multiple strings (called haystacks)
 */
const generateSearchFunction =  (needleString) => {

    const needle = new Buffer(needleString.toLowerCase());
    console.log('New Needle:', needle)
    const charTable = makeCharTable( needle );
    const offsetTable = makeOffsetTable( needle );
    return (haystack) => searchWithNeedle(needle, haystack, charTable, offsetTable)
}

/**
    Returns the index of the first occurence of
    the `needle` buffer within the `haystack` buffer.

    @param {Buffer} needle
    @param {Buffer} haystack
    @return {Integer}
*/
const searchWithNeedle = (needle, haystackString, charTable, offsetTable) => {

    const haystack = new Buffer(haystackString.toLowerCase());

    let i, k;
    const n = needle.length;
    const m = haystack.length;

    if( n === 0 ) return n;

    for( i = n - 1; i < m; ) {

        for( k = n - 1; needle[k] === haystack[i]; --i, --k )
            if( k === 0 ) return i;
        // i += n - k; // for naive method
        i += Math.max( offsetTable[ n - 1 - k ], charTable[ haystack[i] ] );
    }

    return -1;

}

/*
      Makes the jump table based on the
      mismatched character information.

      @param {Buffer} needle
      @return {Buffer}
    */
const makeCharTable= (needle) => {

    const table = new Uint32Array( alphabetSize );
    let n = needle.length;
    const t = table.length;
    let i = 0;

    for( ; i < t; ++i ) {
        table[i] = n;
    }

    n--;

    for( i = 0; i < n; ++i ) {
        table[ needle[i] ] = n - i;
    }

    return table;
}
/*
      Makes the jump table based on the
      scan offset which mismatch occurs.

      @param {Buffer} needle
    */
const makeOffsetTable = (needle) => {

    let i, suffix;
    const n = needle.length;
    const m = n - 1;
    let lastPrefix = n;
    const table = new Uint32Array( n );

    for( i = m; i >= 0; --i ) {
        if( isPrefix( needle, i + 1 ) ) {
            lastPrefix = i + 1;
        }
        table[ m - i ] = lastPrefix - i + m;
    }

    for( i = 0; i < n; ++i ) {
        suffix = suffixLength( needle, i );
        table[ suffix ] = m - i + suffix;
    }

    return table;

}
/*
      Returns the maximum length of the
      substring ends at `i` and is a suffix.

      @param {Buffer} needle
      @param {Integer} i
    */
const suffixLength = (needle, i) => {

    let k = 0;
    const n = needle.length;
    let m = n - 1;

    for( ; i >= 0 && needle[i] === needle[m]; --i, --m ) {
        k += 1;
    }

    return k;

}

/*
      Is `needle[i:end]` a prefix of `needle`?

      @param {Buffer} needle
      @param {Integer} i
    */
const isPrefix = (needle, i) => {

    let k = 0;
    const n = needle.length;

    for( ; i < n; ++i, ++k ) {
        if( needle[i] !== needle[k] ) {
            return false;
        }
    }

    return true;
}

export default generateSearchFunction;