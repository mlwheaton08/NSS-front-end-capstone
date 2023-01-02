import { useEffect, useState } from "react"
import "./Preferences.css"

export const Preferences = () => {
    const localProjectUser = localStorage.getItem("capstone_user");
    const projectUserObject = JSON.parse(localProjectUser);

    const [user, setUser] = useState({
        fullName: "",
        email: "",
        familyBrowsing: false
    })

    const getUser = async () => {
        const response = await fetch(`http://localhost:8088/users/${projectUserObject.id}`)
        const responseJSON = await response.json()
        setUser(responseJSON)
    }

    useEffect(
        () => {
            getUser()
        },
        []
    )


    const changePreferences = async (event) => {
        event.preventDefault()

        const userToSendToAPI = {
            fullName: user.fullName,
            email: user.email,
            familyBrowsing: !user.familyBrowsing
        }

        const sendData = async () => {
            const options = {
                method: "PUT",
                headers: {
                "Content-Type": "application/json"
                },
                body: JSON.stringify(userToSendToAPI)
            }
            await fetch (`http://localhost:8088/users/${projectUserObject.id}`, options)
        }
        await sendData()
        getUser()
    }


    return <main>
        <h2>Preferences</h2>

        <div className = "preferences-container">
            <section className="family-browsing">
                <span>Family-friendly homepage</span>
                {
                    user.familyBrowsing === true
                        ? <svg className="icon family-browsing" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" onClick={changePreferences}>
                            <path d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.7 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0z"/>
                        </svg>
                        : <svg className="icon family-browsing false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" onClick={changePreferences}>
                            <path d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.7 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0z"/>
                        </svg>
                }
            </section>

            <section className="light-mode">
                <span>Toggle Light Mode</span>
                <svg className="icon light-mode" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" onClick={() => {
                    document.body.classList.toggle("light")
                }}>
                    <path d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/>
                </svg>
            </section>
        </div>
    </main>
}