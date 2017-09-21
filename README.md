## What the fork?
When using JIRA, I usually use components and labels. 

1. I added the ability to add,set,remove components using
````bash
	jira i <issue-name> -c [component-name]
	jira i <issue-name> --components [component-name]
````
The component name is optional, if you don't assign one. You'll be prompted to select one from all your available components in that issue's project. Then you'll be asked for the action to make add,remove,set the selected component.

2. I did the same thing-ish for labels.
````bash
	jira i <issue-name> -l [label-name]
	jira i <issue-name> --labels [label-name]
````
Again, you'll be asked for the action to make add,remove,set the selected label. 

Enjoy! :v:


# jira-cli

This is a command line client Jira API, useful to create new issues.

![jira-cli](https://user-images.githubusercontent.com/662930/29991463-f3332c60-8f4c-11e7-8ab1-266aff8dd91a.gif)

## Getting Started

*  Install with npm: `npm install -g jira-cl`
*  Run it with `jira [command] [arguments]`

### Initial Setup
When running the first time (or if you didn't create a config file), it will ask you for your Jira host, username, password and if you use 'https' protocol and a new config file will be created in `~/.jira-cli.json` with this data. You can create or modify this file manually.

## Documentation

To get detailed information about JIRA-CLI usage please visit the documentation which is hosted [here](http://docs.jiracli.com).

## License

Copyright (c) 2017 by Miguel Henao & Eduardo Henao
Licensed under the MIT license.


