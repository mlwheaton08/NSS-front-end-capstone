import { useState } from "react"
import { useParams } from "react-router-dom"
import { ArticleSearch } from "./ArticleSearch"
import { Browse } from "./Browse"
import "./ArticleContainer.css"

export const ArticleContainer = () => {
    const {categoryId} = useParams()
    const {subCategoryId} = useParams()
    const {search} = useParams()

    const [searchTerms, setSearchTerms] = useState({
        categoryId: categoryId,
        subCategoryId: subCategoryId,
        search: search
    })


    return <div className="browse-header">
        <ArticleSearch
            searchTermState={searchTerms}
            setSearchTerms={setSearchTerms} />
        <Browse searchTermState={searchTerms} />
    </div>
}