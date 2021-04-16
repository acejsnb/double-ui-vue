const IsIE = () => !!window.ActiveXObject || 'ActiveXObject' in window;

export default IsIE;
