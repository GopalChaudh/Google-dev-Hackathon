import jwttoken from 'jsonwebtoken'

export default function genratetoken(userId,res){
        const jwt = jwttoken.sign({userId},process.env.jwt_secrate,{
            expiresIn:'15d'
        })

        res.cookie('jwt',jwt,{
            maxAge:15 * 24 * 60 * 60 *1000, // 15 days validation
            httpOnly:true, // prevent XSS attack and cross site attack
            sameSite:"strict" // prevents : crf atacks ,cross site attacks
        })
}