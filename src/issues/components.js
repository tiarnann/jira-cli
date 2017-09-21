// Packages
import inquirer from 'inquirer';
import color from 'chalk';
import Table from 'cli-table2';
import moment from 'moment';
import opn from 'opn';

// Local
import jira from '../jira';
import Issues from './issues'

export default class JiraComponents {
    constructor(){
        this.issues = new Issues
    }

	createUpdateObject(action, name){
        let updateObj =  {
			"update" : { 
				"components" : [
				]
			}
        }

        let op = {}
        
		switch (action) {
            case "add":
            case "remove":
                op[action] = {}
                op[action]["name"] = name
                updateObj.update.components.push(op)
            break
            case "set": 
                op[action] = [{"name":name}]
                updateObj.update.components.push(op)
            break
			default:
				throw new Error(`Unknown action: ${action}`)
		}

        return updateObj
	}

    askForComponentAction(args, component){
        var question = [
            {
             type: 'list',
             name: 'action',
             message: 'Action: ',
             choices: ["Add", "Set", "Remove"]
            }
        ];
        let _this = this
        inquirer.prompt(question).then(function( res ) {
            let action = res.action.toLowerCase()
            _this.performComponentAction(action, args, component)
        });
    }

    performComponentAction(action, issueId, component){
        let updateObject = this.createUpdateObject(action, component)
        this.updateIssueWithObject(issueId, updateObject)
    }

    updateIssueWithObject(issueId, updateObject){
        let _this = this
        return jira.api.updateIssue(issueId, updateObject).then(function(result){
            _this.issues.findIssue(issueId)       
		}).catch(function( res ){
			jira.showErrors( res );
			process.exit();
		});
    }
}