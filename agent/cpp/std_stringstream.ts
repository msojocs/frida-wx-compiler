
// std::string of MSVC 120 (2013)

/*
union
{
	value_type _Buf[_BUF_SIZE];
	pointer _Ptr;
};
size_type _Mysize;	// current length of string
size_type _Myres;	// current storage reserved for string
*/
/**
 * 
 */

export class StdStringStream {
    private addr: NativePointer
	constructor(addr: NativePointer) {
		this.addr = addr;
	}
    get start() {
        return this.addr.add(5 * Process.pointerSize).readPointer()
    }
    get end() {
        return this.addr.add(6 * Process.pointerSize).readPointer()
    }
	toString() {
		return this.start.readUtf8String(this.end.sub(this.start).toUInt32());
	}
}