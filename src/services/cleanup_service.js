const cleanup = async () => {

    console.log(
        'Cleaning uploads...'
    );

    await new Promise(resolve =>
        setTimeout(resolve, 3000)
    );

    console.log(
        'Cleanup finished'
    );

};

module.exports = {

    cleanup

};