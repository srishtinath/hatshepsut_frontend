import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class LoginForm extends Component {
    state = {
        name: "",
        password: "",
        // image: ""
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.handleSubmit(this.state)
        this.setState({
            name: "",
            password: ""
        })
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() { 
        let { formName } = this.props

        return ( 
            <>
            <div className="login-form"> <h1>{formName}</h1>
                <form onSubmit={this.handleSubmit} >
                    <input type="text" name="name" value={this.state.name} onChange={this.handleChange} placeholder="Enter name"></input>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} placeholder="Enter password"></input>
                    <input type="submit"/>
                </form>
                <br></br>
                { formName === "Login" ? 
                <NavLink to="/register">Register</NavLink>    
                :
                <NavLink to="/login">Login</NavLink>    
                }
            </div>
            <div>
                <img src="https://res.cloudinary.com/dqtw2xfuf/image/upload/v1595266951/Hatshepsut/Screen_Shot_2020-07-20_at_1.42.04_PM_vycsij.png" alt="egypt-goddess" className="intro-image"/>
            </div>
            <div className="intro-box">
                <h2>Who was Hatshepsut?</h2>
                <p align="center"><b> TL;DR: A female pharaoh that men from the 20th century thought was evil but she was actually a great ruler and led Egypt 
                    into an era of peace and prosperity. She was a badass that had to deal with men's BS for most of her life.</b></p>
                <p>Queen Hatshepsut was the 6th pharaoh of the 18th dynasty, and one of the most successful female rulers of Ancient Egypt.
                    Her tomb was discovered in 1903, her empty sarcophagus being the twentieth one found in the infamous Valley of Kings.                </p>

                <p>
                    Her reign had been a long one, filled with peace, prosperity, and building projects. While considered a great ruler,
                    her legacy is marred by the so-called unscrupulous way she came into power; she was married to the pharaoh Thutmose II, and made
                    regent to their step-son when Thutmose died. Within a few years, however, she proclaimed herself pharaoh, drawing ire from
                    prominent Egyptologists of the 19th and 20th century as "the vilest type of usurper".</p>
                <p>
                    She insisted on being depicted as male, with bulging muscles and a false beard, deviant and evil as she was. Her chief
                    minister, Senenmut, also her lover, was apparently a co-conspirator in her climb to power, another evil genius in her 
                    quest for domination. Upon her death after her 22-year reign, her stepson was believed to be so angry that he smashed all statues depicting her,
                    and all monuments dedicated to her. </p>
                    <img src="https://hatshepsuut.weebly.com/uploads/6/1/3/0/61307733/5481146_orig.png" alt="hatshepsut" className="hatshepsut-image" />
                <p>
                    The good news (or bad news depending on your perspective) is that this portrayal of a powerful woman being inherently devious and evil
                    was one that was touted because most archaeologists of the 20th century were "gentlemen scholars of a certain generation." 
                    Recent scholarship revealed that Hatshepsut most likely declared herself pharaoh to head off a political crisis, most likely a threat from
                    a competing branch of the royal family. Far from stealing the throne, she probably did so to protect the kingship of her stepson/nephew.</p>
                <p>
                    Granted, she was probably not one of those great leaders that have leadership thrust upon them; she did grow up the daughter of a king,
                    and served as a king's wife for many years. Her ascent to the throne was crafted brilliantly, as she leveraged every advantage she had, 
                    from her bloodline to her religious ties to declare herself the daughter of Ra. But the plight of this successful and just ruler was 
                    that she had the misfortune of being female; ambition in a woman is unbecoming, you see, and she's thus become one of the glaring examples
                    of being the victim of false aspersions in history as a result of her femalehood. </p>
                <p>
                    Queen (or King if you prefer) Hatshepsut's legacy was a spate of ambitious monuments, starting with with the erection of two 100-foot-tall 
                    obelisks at the great temple complex at Karnak, and culminating with her own pyramid. Her piece de resistance, however, was the immense
                    memorial temple at Deir el-Bahri, which is regarded as one of the architectural marvels of the ancient world, with terraced colonnades 
                    and courtyards, pools and gardens with fragrant trees, colossal statues of the female pharaoh as a sphinx, and reliefs marking the achievements 
                    of her reign, including an expedition to the storied land of Punt. </p>
                <p>
                    Hatshepsut's story will always be covered in a veil of mystery, as we can never truly know everything about her intentions and life. Even the 
                    mystery of where her mummy was buried was solved as recently as 2007. But she, like Hamilton, knew she would forever be shrouded in mystery - 
                    on one of her obelisks she wrote "Now my heart turns this way and that, as I think what the people will say—those who shall see my monuments in
                     years to come, and who shall speak of what I have done." As Hamilton said, "You have no control who lives, who dies, who tells your story."</p>

                     <p> Source: <a href="https://www.smithsonianmag.com/history/the-queen-who-would-be-king-130328511/">Smithsonian Mag</a></p>
            </div>
            </>
            );
    }
}
 
export default LoginForm;