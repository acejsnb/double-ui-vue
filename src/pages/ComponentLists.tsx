import './style.styl';

import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';

import Lists, { IComponents } from './Lists';

const ComponentLists = defineComponent({
    name: 'ComponentLists',
    setup() {
        return () => (
            <div class="componentLists">
                <div class="s-list">
                    {Lists.map((item: IComponents) => (
                        <RouterLink
                            key={item.title}
                            to={item.url ? item.url : ''}
                            class="s-list-item"
                        >
                            <article class="s-item-left">{item.title}</article>
                            <article class="s-item-right">
                                <span>{item.more}</span>
                                <i>›</i>
                            </article>
                        </RouterLink>
                    ))}
                </div>
            </div>
        );
    }
});

export default ComponentLists;
