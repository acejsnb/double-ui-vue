import DefaultTheme from 'vitepress/theme'
import './custom.styl'
import Dui from '../components';
import '../components/index.css';

export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        app.use(Dui)
    }
}
