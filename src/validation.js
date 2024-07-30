const validateLength = (target, type, length) =>
  !target
    ? `${type} is required`
    : target.length < length
    ? `${type} must be at least minimum ${length} characters long`
    : null;

const validateEmail = (email) =>
  !email
    ? "Email is required"
    : !/^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(email)
    ? "Invalid email input"
    : null;

export { validateLength, validateEmail };
