

function UserSettings(){

	this.smallShieldTime = 7;
	this.bigShieldTime = 15;
	this.smallPoleTime = 15;
	this.bigPoleTime = 7;
	this.bigBallTime = 15;

} 

if(typeof module != 'undefined'){
    module.exports = UserSettings;
}
