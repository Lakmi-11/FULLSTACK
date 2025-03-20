
export function Contact() {

function handleSubmit(){
//call API function (if we had one)
}

    return (
        <div>
            <h1>Contact Us</h1>
            <p>Have you any question? Contact us and give your comment. 
   <a href="mailto:Imperialcashew@gmail.com">Send us an email</a>
</p>

            <form onSubmit={handleSubmit}>
                <label>Name: </label>
                <input type="text" name="name"/>
                
                <label>Email: </label>
                <input type="email" name="email"/>

                <label>Message: </label>
                <textarea name="message"></textarea>

                <button type="submit">Send</button>

        
           </form>
        
        
        
        
        
        
        
        
        </div>
    )
}
