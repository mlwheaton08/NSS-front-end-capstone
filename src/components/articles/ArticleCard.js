export const ArticleCard = ({ category, subCategory, article }) => {
    
    return <>
        {
            subCategory
            ? <h1>{category.name} - {subCategory.name}</h1>
            : <h1>{category.name}</h1>
        }
    </>
}