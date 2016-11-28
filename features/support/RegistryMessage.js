/**
 * Created by singhs10 on 7/25/16.
 */
var registryMessage = function() {

/******* Import Trial **********/
    this.invalidNCTIDErrorMsg = 'A study with the given identifier is not found in ClinicalTrials.gov.';
    this.duplicateNCTIDErrorMsg = 'A study with the given identifier already exists in CTRP. To find this trial in CTRP, go to the Search Trials page.';
    this.duplicateLeadOrgAndLeadOrgIDErrorMsg = 'Combination of Lead Organization Trial ID and Lead Organization must be unique.';

/******* Registry Trial Dates *******/
    this.trialDatesCompletionActualMessage = 'Completion Date type cannot be Actual if Completion Date is in the future';
    this.trialDatesCompletionStatusMessage = function(trialStatus)  {
        return 'If current Trial Status is ' + trialStatus + ', Completion Date must be Anticipated';
    };


/******* Default Selected Values *********/
    this.trialSecondaryPurposeFieldDefaultValue = '-Select a Secondary Purpose-';
    this.trialReponsiblePartyFieldDefaultValue = '-Select a Responsible Party-';


/******* Characters Left ********/
    this.zeroCharactersLeft = '0 characters left';
    this.twentyFiveCharactersLeft = '25 characters left';
    this.oneFiftyCharactersLeft = '150 characters left';
    this.twoHundredFourCharactersLeft = '204 characters left';
    this.fiveFiftyCharactersLeft = '550 characters left';
    this.nineFiftyCharactersLeft = '950 characters left';


/******** Characters Sample *******/
    this.thirtyCharactersSample = 'The quick, brown fox jumps ove';

    this.twoHundredCharactersSample = 'One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could se';

    this.twoFiftyFourCharactersSample = 'The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex!' +
                                        ' Fox nymphs grab quick-jived waltz. Brick quiz whangs jumpy veld';

    this.sixHundredCharactersSample =   'A wonderful serenity has taken possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot,' +
                                        ' which was created for the bliss of souls like mine. I am so happy, my dear friend, so absorbed in the exquisite sense of mere tranquil existence, that I neglect my talents. I should be ' +
                                        'incapable of drawing a single stroke at the present moment; and yet I feel that I never was a greater artist than now. When, while the lovely valley teems with vapour around me, and the' +
                                        ' meridian sun strikes the upper surface.';

    this.thousandCharactersSample = 'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.' +
                                    ' Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with ' +
                                    'the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind ' +
                                    'texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar. The Big Oxmox advised' +
                                    ' her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her ' +
                                    'initial into the belt and made herself on the way. When she reached the first hills of the Italic Mountains, she had a last view back on the skyline of her hometown Bookmarksg';


};
module.exports = registryMessage;