#################
# Rebenque Grid
# v0.0.6
# January 2016
#################

# Features

- responsive
- nestable (fully tested in row direction only!)
- padding and margin are dynamic and can be set to both container and cells
- border cannot take % as width, thus not dynamic
- extensive use of sass to make it highly customizable

- Normal cells -

-> fill up all the container space in the main direction until the "number of cells before wrap" is reached
-> number of cells before wrap is a parameter


- Specific length cells (defined aspect ratio) -

-> take up only specific % of the container space
-> number of division is the parameter to set up the number of divisions chosen to break down the length 

# CAVEATS

- Nestable elements only working for auto cells

# TODO

