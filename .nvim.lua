local project_config = {
	lint = {
		"eslint",
		"prettier",
	},
}

_G.EXRC_M = {
	project_config = project_config,

	setup = function() end,
}
