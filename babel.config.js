module.exports = api => { 
    const isTest = api.env('test');
    return {
        presets:[ 
            [
                '@babel/preset-env',
                {
                    modules: isTest ? 'cjs' : 'systemjs'
                }
            ]
        ]
    }
}