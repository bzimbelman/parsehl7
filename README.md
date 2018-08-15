# Project Title

This is a very simple HL7 parser that breaks a message into an array of segments, and breaks a segment into an array of fields
based on the field seperator. This parser does not have logic for segment relationships based on nesting/location. To handle that 
with this parser you will have to iterate over the array of segments and process the segments based on their location.

## Getting Started

npm install parsehl7

### Prerequisites

None.

### Installing

```
npm install parsehl7 --save
```

### And coding style tests

To get the segments from a message:

```
const segments = parser.parseMessageIntoSegments(message);
```
To get fields from a segment:

```
const mshFields = parser.findSegmentByName(segments, 'MSH');
```

## Contributing

I built this for use in some basic conversions and field manipulation I needed to do. If you feel you would like to contribute and improve, feel free to do so.

## Authors

Brian Zimbelman

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

