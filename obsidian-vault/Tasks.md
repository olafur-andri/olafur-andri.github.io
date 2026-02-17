- [x] It would be very nice to be able to have a setting where the user can change their preferred color scheme (light / dark / automatic)
	- [x] For this, I'll need to re-think the `<header />` a bit (make it more like Monkeytype instead of what I have now)
	- [x] The theme button should update the website's theme if the user chooses a theme that is different from the current one
	- [x] The theme button should highlight (somehow) the option that corresponds to the active theme
	- [x] The theme button should save the user's preferred theme in `localStorage`

- [x] Raddle front page
	- [x] Should link to the original raddle.quest website
		- [x] state that that's the inspiration
		- [x] state that that's where you can also try it out and learn what a Raddle is
	- [x] Could also list some premade ones (the links to them at least)
	- [x] Should also have a link to the Raddle Maker page

- [x] Raddle page
	- [x] If I try to write in the last input, then the first input gets automatically focused
	- [x] The used clues need to be styled differently from the unused ones
	- [x] If the user wins the Raddle, then instead of splitting the clues out into used vs. unused, then a single section should be shown called *Clues, in order* that reveals all the clues in order
	- [x] When I check for whether a step is completed, I need to remove all non-alphanumeric characters *only*
	- [x] Gotta get the phrases to show up for each step! (even though it hasn't been revealed yet)
		- [x] This will require some template reworking in the ladder component
	- [x] Make sure to disable inputs that the user is not allowed to edit yet
	- [x] Make sure that disabled inputs have a nice placeholder text like in raddle.quest
	- [x] Make sure that the letter count is displayed on the left of each input (how does raddle.quest do it?)
	- [x] The user should be able to click on the input on the other side, as an alternative means to flip the solve direction
	- [x] We need a hint button on the right as well, same as how raddle.quest does it
	- [x] Should link to the original Raddle.quest page as well
	- [x] If the user has chosen to reveal the correct clue, then we have to *still* do that even if we flip the ladder direction twice
	- [x] Should be able to toggle between solving the ladder upwards/downwards
		- [x] Should be able to click on the next available input to do that as well
	- [x] Make sure that spaces are marked specially when writing out the shape of the guessing word
	- [x] Make sure that apostrophes are also marked specially when writing out the shape of the guessing word
	- [x] Should also show the words that are supposed to be in between the guessing words
	- [x] Make sure that the "Used Clues" are actually in order
	- [x] When the user finishes a Raddle, their progress must be displayed on top of the page, similarly to how raddle.quest does it.
	- [x] Make sure that whenever the user progresses to the next step in the ladder, that the newly-active input element is focused
	- [x] This page should also link to my own home page
	- [x] It's important that the page is responsive for smaller screens as well
	- [x] The user should not lose their progress. Use localStorage to save the user's progress.
	- [x] Instead of showing GitHub and LinkedIn links in the header, there should be a button that says "**+ Create your own Raddle**"
		- [x] Make sure that it is also minimized on small screens
	- [x] You should also have a share button in the page header that copies the raddle link to the clipboard
		- [x] Perhaps you can use the Angular Material snack bar for that? Worst case, you can just create a new dialog.
	- [x] Give a tooltip to the small icon buttons in the page header

- [x] Raddle Maker page
	- [x] The user should be able to append a new step
	- [x] The user should be able to delete any step (as long as it doesn't bring the word count below 2)
	- [x] Should link to the original Raddle.quest page as well
	- [x] This page should also link to my own home page
	- [x] What's the maximum length of a step's word?
	- [x] What's the maximum length of a step's phrase?
	- [x] What's the maximum URL length limit? Make sure that the user is warned about it if limits are exceeded.
	- [x] There should be a button that resets the entire form
	- [x] We should save the user's progress

- [x] Gotta make sure that users don't lose their progress when they refresh any of the pages
	- [x] While playing a custom Raddle game
	- [x] While making a Raddle game

- [x] Would be awesome to make the page header not show the GitHub and LinkedIn links if I'm not at the front page

- [ ] Once you've published the updated version of your webpage to GitHub Pages, try to refresh your Raddle game (ideally when your URL is `olafur-andri.github.io/something/`). Does it break anything?

- [ ] ==**Let's create the Raddle for Lotte**==
- [ ] ==Make sure that the Christmas Carol game is also available in this new website==
- [x] Make sure that the link to your Raddle system is on your front page
- [ ] Because the Raddle page has a highly custom ladder component, I should be thorough in my testing
	- [ ] Chrome (PC)
		- [ ] Navigate to all of the different pages and see whether they look okay
			- [ ] Front page
			- [ ] Raddle front page
			- [ ] Raddle maker
			- [ ] Raddle page
		- [ ] Try to play a game of Raddle and see how nice it is
	- [ ] Edge (PC)
		- [ ] Navigate to all of the different pages and see whether they look okay
			- [ ] Front page
			- [ ] Raddle front page
			- [ ] Raddle maker
			- [ ] Raddle page
		- [ ] Try to play a game of Raddle and see how nice it is
	- [ ] Firefox (PC)
		- [ ] Navigate to all of the different pages and see whether they look okay
			- [ ] Front page
			- [ ] Raddle front page
			- [ ] Raddle maker
			- [ ] Raddle page
		- [ ] Try to play a game of Raddle and see how nice it is
	- [ ] Chrome (Phone)
		- [ ] Navigate to all of the different pages and see whether they look okay
			- [ ] Front page
			- [ ] Raddle front page
			- [ ] Raddle maker
			- [ ] Raddle page
		- [ ] Try to play a game of Raddle and see how nice it is
	- [ ] Firefox (Phone)
		- [ ] Navigate to all of the different pages and see whether they look okay
			- [ ] Front page
			- [ ] Raddle front page
			- [ ] Raddle maker
			- [ ] Raddle page
		- [ ] Try to play a game of Raddle and see how nice it is
# Example spec
```json
{
	"id": "abcd",
	"firstStep": {
		"word":"one",
		"clueToNextWord":"What comes after {from}?",
		"phraseToNextWord":"and then"
	},

	"intermediateSteps": [
		{
			"word":"two",
			"clueToNextWord":"{from} siblings born on the same day are {to}",
			"phraseToNextWord":"people can be"
		},
		{
			"word":"twins",
			"clueToNextWord":"\"{from} for {to}!\"",
			"phraseToNextWord":"for"
		},
		{
			"word":"wins",
			"clueToNextWord":"In most competitions, one either {from} or {to}",
			"phraseToNextWord":"or"
		},
		{
			"word":"loses",
			"clueToNextWord":"Change one letter in {from} to get someone who parted a sea",
			"phraseToNextWord":"L → M"
		}
	],
	
	"lastWord":"moses",
	"author":"Ólafur Andri Davíðsson",
	"rngSeed":42
}
```

`N4IgZglgTgzgLgZTgUwA4gFygO4HsoAmmIuAdsiADQgDGANgK7IAquAcsgB5wDq+RGEDwAWAQzgACGrgC2yGBNFgUUCcDBRZAXwD8VEKmFRRMFuy69+xUaQIS4w5KRBbqEUirkEI45EjQwmADaOFaCcHj69EysHNx8hMTqmjJaEjAQAEZ07gDmCpn4pBJk9o7ponISBKIAnopQyGpwuFr6hsamsRYJAgbIuKh0TTQ2EpkUrqGJ4djugdTRZnGWMyAAOiDJ2hJg+M2tAISb7UYmyz1h4PgulNN9c6QLtIwX8VcAksUyuPBSsqhkHAIMCyDBKCVyBJkCDHKptqkSvCWm1qB1zt13msblMQHg1nRfvIoq9Mas+gBhMSkXJNMhNYZwFQSdxqDQ7FoSWmSGCyAZQ7DCXASVCiKAoOyidLIUSnTpvcnEAAyEkASYQSACyLgAutQ6CZFYIfqZnqIGA4boIAMv6sAMVQAQVsUAgEgAIqIAG4AW4ADzBec5qFAaQhkMgBAAWABMWiAA`