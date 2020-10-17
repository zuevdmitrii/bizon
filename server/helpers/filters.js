const getFilterQuery = (filter) => {
    if(!filter || !filter.logic || !filter.filters.length) {
        return null
    }
    if (filter.logic === "and") {
        return getFilterComposition(filter);
    } else if (filter.logic === "or") {
        const newFiltersArr = filter.filters.map((el) => {
            if (el.operator === "eq") {
                return { [el.field]: el.value };
            } else if (el.operator === "contains") {
                return { [el.field]: { $regex: el.value, $options: "i" } };
            }
        });
        return { $or: newFiltersArr };
    }
};

const getFilterComposition = (filter) => {
    const resultObj = {};
    filter.filters.forEach((el) => {
        if (el.operator === "eq") {
            resultObj[el.field] = el.value;
        } else if (el.operator === "contains") {
            resultObj[el.field] = { $regex: el.value, $options: "i" };
        }
    });
    return resultObj;
};

module.exports = getFilterQuery
