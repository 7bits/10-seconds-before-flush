game.resources = [

	/* Graphics. 
	 * @example
	 * {name: "example", type:"image", src: "data/img/example.png"},
	 */
    // game font
	{name: "32x32_font",      type:"image",	src: "data/img/font/32x32_font.png"},
	// title screen
	{name: "title_screen",    type:"image",	src: "data/img/gui/title_screen.png"},
	{name: "win_screen",      type:"image",	src: "data/img/gui/win_screen.png"},
	{name: "flush_screen",    type:"image",	src: "data/img/gui/flush_screen.gif"},
	{name: "gameover_screen", type:"image",	src: "data/img/gui/gameover_screen.png"},

	{name: "area01_level_tiles", type:"image", src: "data/img/map/area01_level_tiles.png"},
	
    //{name: "gripe_run_right", type:"image", src: "data/img/sprite/gripe_run_right.png"},
    {name: "monstr", type:"image", src: "data/img/sprite/monstr_96px.png"},
    {name: "metatiles32x32", type:"image", src: "data/img/map/metatiles32x32.png"},
	/* Atlases 
	 * @example
	 * {name: "example_tps", type: "tps", src: "data/img/example_tps.json"},
	 */
		
	/* Maps. 
	 * @example
	 * {name: "example01", type: "tmx", src: "data/map/example01.tmx"},
	 * {name: "example01", type: "tmx", src: "data/map/example01.json"},
 	 */
	{name: "level0", type: "tmx", src: "data/map/level0.tmx"},
	{name: "level1", type: "tmx", src: "data/map/level1.tmx"},
	{name: "level2", type: "tmx", src: "data/map/level2.tmx"},
	{name: "level3", type: "tmx", src: "data/map/level3.tmx"},

        // the spinning coin spritesheet
    {name: "spinning_coin_gold",  type:"image", src: "data/img/sprite/spinning_coin_gold.png"},
        // our enemty entity
    {name: "wheelie_right",       type:"image", src: "data/img/sprite/wheelie_right.png"},

        // game font
        {name: "32x32_font",          type:"image", src: "data/img/font/32x32_font.png"},
	/* Background music. 
	 * @example
	 * {name: "example_bgm", type: "audio", src: "data/bgm/", channel : 1},
	 */	
	
	/* Sound effects. 
	 * @example
	 * {name: "example_sfx", type: "audio", src: "data/sfx/", channel : 2}
	 */
];
