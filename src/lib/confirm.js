function confirm(handler, message, callback, callBackParam) {
    handler.$confirm(
        {
            message: message,
            button: {
                no: 'No',
                yes: 'Yes'
            },
            /**
             * Callback Function
             * @param {Boolean} confirm
             */
            callback: confirm => {
                if (confirm) {
                    handler[callback](callBackParam);
                } else {
                }
            }
        }
    )
}

export {confirm}