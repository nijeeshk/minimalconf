# Build Process

## Setting up docker (Build Environment)

Execute the following command to build a new docker image from the bundled Dockerfile

`docker build  -t my_image .`

This will create a new docker image with the name **my_image**.
Commands can be executed on this image using the following syntax

`docker run --rm -v $(pwd):/data -it my_image <command>`

## Installing dependencies

`docker run --rm -v $(pwd):/data -it my_image yarn install`

This will install the dev dependencies as well as the project dependencies.


## Building the files

`docker run --rm -v $(pwd):/data -it my_image yarn build`

This will create the build folder `/dist`.

The `yarn build` command accepts the following options.

**--api_root**  = Mandatory option that specifies the collector endpoint
