const cleanup = async () => {

    console.log(
        'Cleaning uploads...'
    );

    // Пока просто имитация работы

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