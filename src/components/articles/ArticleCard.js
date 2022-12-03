import "./ArticleCard.css"

export const ArticleCard = ({ category, subCategory, article }) => {
    
    return <>
        <div className="articleCard">
            <div className="articleHeader">
                <span className="articleCategory">{category.name}
                    {
                        subCategory ? " - " + subCategory.name : ""
                    }
                </span>
                <button id="btn btn_favorite">Favorite</button>
            </div>

            <h3 className="articleTitle">{article.title}</h3>
            <p className="articleTeaserText">{article.teaserText}</p>
        </div>
    </>
}