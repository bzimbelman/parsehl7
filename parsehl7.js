'use strict';

let _segSep = String.fromCharCode(13);
let _fieldSep = '';
let _compSep = '';
let _repSep = '';
let _fieldRepeat = '';
let _escapeChar = '';

module.exports = class  parsehl7 {
	static get segSep() { return parsehl7.prototype._segSep; };
	static get fieldSep() { return parsehl7.prototype._fieldSep; };
	static set fieldSep(val) { parsehl7.prototype._fieldSep = val };
	static get compSep() { return parsehl7.prototype._compSep; };
	static set compSep(val) { parsehl7.prototype._compSep = val };
	static get repSep() { return parsehl7.prototype._repSep; };
	static set repSep(val) { parsehl7.prototype._repSep = val; };
	static get fieldRepeat() { return parsehl7.prototype._fieldRepeat; };
	static set fieldRepeat(val) { parsehl7.prototype._fieldRepeat = val; };
	static get escapeChar() { return parsehl7.prototype._escapeChar; };
	static set escapeChar(val) { parsehl7.prototype._escapeChar = val; };
	static get startFrame() { return String.fromCharCode(11); };
	static get endFrame() { return String.fromCharCode(28) + String.fromCharCode(13); };

	//	Parse the entire message into an array of segments. 
	//	Each segment has a type and a fields.
	//
	static parseMessageIntoSegments(message) {
		// Start with the MSH segment as it defines the structure of the rest of the 
		// message re nesting of segments.

		parsehl7.prototype._segSep = String.fromCharCode(13);
		const segments = message.toString().split(parsehl7.prototype._segSep);
		const mshSegment = segments[0];
		parsehl7.prototype._fieldSep = mshSegment.substring(3,4);
		parsehl7.prototype._compSep = mshSegment.substring(4,5);
		parsehl7.prototype._repSep = mshSegment.substring(5,6);
		parsehl7.prototype._fieldRepeat = mshSegment.substring(6,7);
		parsehl7.prototype._escapeChar = mshSegment.substring(7,8);

		let s = [];

		for (let i = 0; i<segments.length; i++) {
			const fields = segments[i].split(parsehl7.prototype._fieldSep);
			let f = [];
			for (let j = 0; j<fields.length; j++) {
				if (!fields[j]) {
					f.push('');
				} else {
					f.push(fields[j]);
				}
			}
			s.push( { type: fields[0], fields: fields } );
		}

		return s;
	}

	static findSegmentByName(segments, name) {
		let s = { type: '', fields: [] };
		for (let i = 0; i<segments.length; i++) {
			if (segments[i].type === name) {
				s = segments[i];
				break;
			}
		}
		return s;
	}
}
