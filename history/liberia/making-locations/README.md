This directory contains what i used in order to build the locations
file for Liberia, starting from data provided by the DHIS team.

The CSV file `Liberia zones - DHIS2-ET-OrgUnits.csv` was given to me
from Obdulia, it is the most reliable source we have at the
moment. Starting from this file, a couple of steps are needed in order
to produce locations, and they are defined in a `Makefile` in this
folder. The file is meant to be used with GNU Make, i used to run in
on a Mac machine.

Running make like the following command in this directory:

    $ make

It will execute all steps until all files are up to date. Any partial
result depends on the previous input data and on the necessary script,
so that when you change a script you can type `make` again in order to
see the effect of the changes. The process is divided in steps in
order for you to inspect the partial results. At the beginning, Make
will try to install the Node dependencies defined in the
`package.json` file in this dir.

At the end of a successful conversion, the new locations will be in
the file `output.json`.
