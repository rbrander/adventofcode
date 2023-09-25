/*
--- Part Two ---

Now, you're ready to choose a directory to delete.

The total disk space available to the filesystem is 70000000. To run the update, you need unused space of at least 30000000. You need to find a directory you can delete that will free up enough space to run the update.

In the example above, the total size of the outermost directory (and thus the total amount of used space) is 48381165; this means that the size of the unused space must currently be 21618835, which isn't quite the 30000000 required by the update. Therefore, the update still requires a directory with total size of at least 8381165 to be deleted before it can run.

To achieve this, you have the following options:

    Delete directory e, which would increase unused space by 584.
    Delete directory a, which would increase unused space by 94853.
    Delete directory d, which would increase unused space by 24933642.
    Delete directory /, which would increase unused space by 48381165.

Directories e and a are both too small; deleting them would not free up enough space. However, directories d and / are both big enough! Between these, choose the smallest: d, increasing unused space by 24933642.

Find the smallest directory that, if deleted, would free up enough space on the filesystem to run the update. What is the total size of that directory?
*/

const data = require('./data');
// const data = require('./testData');
const lines = data.split('\n');

const MAX_FILE_SYSTEM_SIZE = 70_000_000;
const UPDATE_SPACE_NEEDED = 30_000_000;

// Used a hidden property to prevent circular dependencies when printing using JSON.stringify
const hiddenProperty = Symbol('hiddenProperty');
const directoryParent = hiddenProperty;
class Directory {
  constructor(name, parent) {
    this.name = name;
    this[directoryParent] = parent;
    this.children = [];
  }
  get size() {
    return this.children.reduce((sum, curr) => sum + curr.size, 0);
  }
  toString() {
    return `dir ${this.name}`;
  }
  forEachDirectory(callback) {
    this.children
      .filter(child => child instanceof Directory)
      .forEach(child => child.forEachDirectory(callback));
    return callback(this);
  }
}

class File {
  constructor(name, size) {
    this.name = name;
    this.size = typeof size === 'number' ? size : Number(size);
  }
  toString() {
    return `${this.size} ${this.name}`;
  }
}

const parseLinesIntoDirectoryTree = (lines) => {
  let path = '/';
  const root = new Directory('/', null);
  let currDirectory = root;
  lines.forEach(line => {
    const isCommand = line.startsWith('$');
    if (isCommand) {
      const [, command, ...args] = line.split(' ');
      switch (command) {
        case 'cd':
          const destination = args[0];
          switch (destination) {
            case '/':
              path = '/';
              currDirectory = root;
              break;
            case '..':
              const newEndIndex = path.lastIndexOf('/', path.length - 2); // -2 to skip trailing slash
              path = path.slice(0, newEndIndex + 1);
              currDirectory = currDirectory[directoryParent];
              break;
            default:
              path += destination + '/';
              currDirectory = currDirectory.children.find((child) => child instanceof Directory && child.name === destination);
              break;
          }
          break;
        case 'ls':
          break;
        default:
          console.error('unknown command:', command);
          break;
      }
    } else {
      // output from 'ls' (directory or file)
      const isDirectory = line.startsWith('dir');
      if (isDirectory) {
        const [, name] = line.split(' ');
        currDirectory.children.push(new Directory(name, currDirectory));
      } else { // isFile
        const [size, name] = line.split(' ');
        currDirectory.children.push(new File(name, size));
      }
    }
  });

  return root;
}

/////////////////////////////////////////////////////////////

const tree = parseLinesIntoDirectoryTree(lines);

// get total file system size
const totalFileSystemSize = tree.size;
// determine amount needed by subtracting amount free from amount needed for update
const amountFree = (MAX_FILE_SYSTEM_SIZE - totalFileSystemSize);
const amountNeeded = UPDATE_SPACE_NEEDED - amountFree;
// find the smallest directory that meets the size needed
const directoriesMatchingAmountNeeded = [];
tree.forEachDirectory(directory => {
  if (directory.size >= amountNeeded) {
    directoriesMatchingAmountNeeded.push(directory.size);
  }
});
directoriesMatchingAmountNeeded.sort((a, b) => a - b);
const smallestDirectorySize = directoriesMatchingAmountNeeded[0];

console.log('smallestDirectory size =', smallestDirectorySize);
