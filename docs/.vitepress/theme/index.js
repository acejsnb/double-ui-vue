import DefaultTheme from 'vitepress/theme'
import './custom.styl'
import Dui from '../../../es';
import '../../../es/base.css';
import '../../../es/index.css';

export default {
    ...DefaultTheme,
    enhanceApp({ app }) {
        app.use(Dui)
    }
}
