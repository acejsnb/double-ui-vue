import './style.styl';

import { defineComponent } from 'vue';
import { RouterLink } from 'vue-router';

import Lists from './Lists';

const ComponentLists = defineComponent({
    name: 'ComponentLists',
    setup() {
        return () => (
            <div class="componentLists">
                <div class="s-list">
                    {
                        Lists.map((item, index) => (
                            <RouterLink key={index} to={item.url ? item.url : ''} class="s-list-item">
                                <article className="s-item-left p-persagy-bold">{ item.title }</article>
                                <article className="s-item-right"><span>{ item.more }</span><i>›</i></article>
                            </RouterLink>
                        ))
                    }
                </div>
            </div>
        );
    }
});

export default ComponentLists;
