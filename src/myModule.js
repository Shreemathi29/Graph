const message = 'some message from myModule.js'

const name = 'shreemathi'

const location ='vellore'

const getGreeting = (location) => {
    return `Welcome to our ${location}`
}
export { message , name, getGreeting, location as default}