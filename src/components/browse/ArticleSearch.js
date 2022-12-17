import { useState, useEffect } from "react"
import "./ArticleSearch.css"

export const ArticleSearch = ({ searchTermState, setSearchTerms }) => {
    const [categoryOptions, setCategoryOptions] = useState([])
    const [subCategoryOptions, setSubCategoryOptions] = useState([])

    useEffect(
        () => {
            const fetchCategories = async () => {
                const response = await fetch('http://localhost:8088/categories')
                const responseJSON = await response.json()
                setCategoryOptions(responseJSON)
            }
            fetchCategories()
        },
        []
    )

    useEffect(
        () => {
            const fetchSubCategories = async () => {
                if (searchTermState.categoryId !== 0) {
                    const response = await fetch(`http://localhost:8088/subCategories?categoryId=${searchTermState.categoryId}`)
                    const responseJSON = await response.json()
                    if (responseJSON.length <= 1) {
                        setSubCategoryOptions([])
                    } else {
                        setSubCategoryOptions(responseJSON)
                    }
                }
            }
            fetchSubCategories()
        },
        [searchTermState.categoryId]
    )

    const getSearch = () => {
        if (searchTermState.search === "no_search") {
            return ""
        } else {
            return searchTermState.search
        }
    }


    return <form id="search-form">
        <section id="search-bar">
            <svg id="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"/>
            </svg>
            <input id="search-input" value={getSearch()}
                type="text"
                placeholder="Search..."
                onChange={
                    (evt) => {
                        const copy = {...searchTermState}
                        copy.search = evt.target.value
                        setSearchTerms(copy)
                    }
                }
            />
        </section>
        
        <select id="filter-category" name="categories" value={searchTermState.categoryId}
            onChange={
                (evt) => {
                    const copy = {...searchTermState}
                    copy.categoryId = evt.target.value
                    copy.subCategoryId = ""
                    setSearchTerms(copy)
                }
            }
        >
            <option value="">Select a Category</option>
            {
                categoryOptions.map((category) => {
                    return <option value={category.id} key={`category--${category.id}`}>{category.name}</option>
                })
            }
        </select>

        {
            subCategoryOptions.length <= 1
                ? ""
                : <>
                    <select id="filter-subcategory" name="subCategories" value={searchTermState.subCategoryId}
                        onChange={
                            (evt) => {
                                const copy = {...searchTermState}
                                copy.subCategoryId = evt.target.value
                                setSearchTerms(copy)
                            }
                        }
                    >
                        <option value="" selected disabled>Select a Subcategory</option>
                        {
                            subCategoryOptions.map((subCategory) => {
                                return <option value={subCategory.id} key={`subCategory--${subCategory.id}`}>{subCategory.name}</option>
                            })
                        }
                    </select>
                </>
        }
    </form>
}