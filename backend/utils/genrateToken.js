import jwttoken from 'jsonwebtoken'

export default function genratetoken(userId,res){
        const jwt = jwttoken.sign({userId},process.env.jwt_secrate,{
            expiresIn:'15d'
        });

        return jwt;
}