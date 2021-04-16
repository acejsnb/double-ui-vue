import RandomNum from './RandomNum';

const CreateJson = (num, ind) => {
    const data = [];
    for (let i = 0; i < num; i++) {
        data.push({
            id: String(RandomNum(ind * i, 1000000)),
            name: `name-${ind}-${i}`,
            open: false,
            checked: 'uncheck'
        });
    }
    return data;
};

const CreatePTreeJson = num => CreateJson(num, 0).map((d, i) => {
    d.children = CreateJson(num, i);
    return d;
});

export default CreatePTreeJson;
