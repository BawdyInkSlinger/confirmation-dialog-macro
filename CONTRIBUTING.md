# Local set up

1. `git clone url_to_this_repo.git` (get the link from the "Code" button on this git repo URL)
1. `npm i` (to install dependencies)
1. `npm t` (to build and run tests)

# Releasing

1. `git t` (to build and run tests)
1. Go to https://github.com/BawdyInkSlinger/dialog-element-macro/releases/new
1. Click the "Choose a tag" button
1. Create a new tag by typing the next version number into the input field
1. Click "Generate release notes"
1. Open the `./dist` directory on your local computer
1. Drag all files to the browser tab and drop them on the section with a "Attach binaries by dropping them here or selecting them." label
1. Click "Publish release"