const SRS_INTERVALS : number[] = [0, 1, 3, 5, 8, 13, 21, 34]

const getNextReviewDate = (repetition: number):  number => {

    const nextReviewDate = SRS_INTERVALS[repetition] ?? 34
    return nextReviewDate //return a number to add to todays date to calculate revvewDate 
}

export default getNextReviewDate;