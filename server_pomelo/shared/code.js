module.exports = {
	OK: 200, 
	FAIL: 500, 

	ENTRY: {
		FA_TOKEN_INVALID: 	1001, 
		FA_TOKEN_EXPIRE: 	1002, 
		FA_USER_NOT_EXIST: 	1003,
		FA_USER_ALREADY_LOGIN:	1004,
		FA_USER_PWD_ERROR:	1005,
        FA_REG_USER_ALREADY_EXIST:	1006,
        FA_REG_USER_NAEM_NO:	1007
	}, 

	GATE: {
		FA_NO_SERVER_AVAILABLE: 2001
	}, 

	LOBBY: {
		FA_CHANNEL_CREATE: 		3001, 
		FA_CHANNEL_NOT_EXIST: 	3002, 
		FA_UNKNOWN_CONNECTOR: 	3003, 
		FA_USER_NOT_ONLINE: 	3004 
	},

	ZONE:{
		FA_ALREADY_EXIST:4001,
        FA_NOT_EXIST:4002
	},
	
	UNIT_STATE:{
		US_NORMAL: 				0,
		US_BUILDING: 			1,
		US_READY: 				2 
	}
};