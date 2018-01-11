'use strict';

/**
 * Requirements
 * @ignore
 */
const Command = require('entoj-system').command.Command;
const Context = require('entoj-system').application.Context;
const ServerCommand = require('entoj-system').command.ServerCommand;
const JspmCommand = require('entoj-jspm').command.JspmCommand;
const SassCommand = require('entoj-sass').command.SassCommand;
const co = require('co');


/**
 * @memberOf command
 */
class StartCommand extends Command
{
    /**
     */
    constructor(context)
    {
        super(context);

        // Assign options
        this._name = ['start'];
    }


    /**
     * @inheritDoc
     */
    static get injections()
    {
        return { 'parameters': [Context] };
    }


    /**
     * @inheritDocs
     */
    static get className()
    {
        return 'command/StartCommand';
    }


    /**
     * @inheritDocs
     */
    get help()
    {
        const help =
        {
            name: this._name,
            description: 'Starts all necessary commands for development',
            actions:
            [
            ]
        };
        return help;
    }


    /**
     * @inheritDocs
     * @returns {Promise<Server>}
     */
    dispatch(parameters)
    {
        const scope = this;
        const promise = co(function *()
        {
            yield scope.context.di.create(SassCommand).watch();
            yield scope.context.di.create(JspmCommand).watch();
            yield scope.context.di.create(ServerCommand).start();
        });
        return promise;
    }
}


/**
 * Exports
 * @ignore
 */
module.exports.StartCommand = StartCommand;
