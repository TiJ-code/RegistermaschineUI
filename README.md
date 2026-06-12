# Registermaschine UI

This is a rough IDE implementation around the [Registermaschine](https://github.com/TiJ-code/Registermaschine) core library.

This simple IDE supports
- syntax highlighting
- slow debug mode
- visual register updates
- input / output instruction support fields
- execution environment info
- auto-generated visual display of instruction information

This IDE can run with different instruction-set XML files, and generates usage and description of instructions from those
instructions defined inside the instruction-set XML file.

There is also a rough support of the JAR plugin system of the [Registermaschine](https://github.com/TiJ-code/Registermaschine) core library,
so that custom instruction handlers can be dynamically loaded, to support fully customized instruction-sets.

