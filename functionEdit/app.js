/**
 * Primary application logic for our Functional Programming blog example
 * See related blog series at: http://www.datchley.name/tag/functional-programming/
 * Version: 2.0
 */
 
// A simple, resuable comparison for '>='
function greaterThanOrEqual(a, b) {
  return a >= b
}

// Right curried so we can create useful unary predicates
var greaterThanOrEqualTo = rightCurry(_greaterThanOrEqual);

// Create a unary predicate to use with filter that lets us filter
// for values >= 30 days ago
var thirtyDays = (new Date()).getTime() - (86400000 * 30),
    within30Days = useWith(greaterThanOrEqualTo(thirtyDays), getWith('published'));

//
// [ BLOG POST PART 1 ]
// REQUIREMENT #1: Filter records by publish date
//

// Use our newerThan30Days predicate, modified using withProp
// to allow it to access object's `.date` property
var filtered = filterWith(within30Days)(records);

//
// [ BLOG POST PART 2 ]
// REQUIREMENT #2: Group filtered records by tag
//

// Step 1: explode the data structure (our filtered records) so that we have one record for each tag-post combination. 
var bytags = pairWith(getWith('tags'))(filtered);

// Step 2: group by the tags (pair[1]):  
var groupedtags = groupBy(getWith(1), bytags);

// Step 3: reduce each tag-post pair down to just the post (removes the tag)
function getPostRecords(prop, value) {
  return pluckWith(0)(value); 
}

var finalgroups = mapObjectWith(getPostRecords)(groupedtags);

//
// [ BLOG POST PART 3 ]
// REQUIREMENT #3: Sort groups by publish date descending (new to old)
//

function greaterThan(a,b) {
    return a > b;
}
var descending = comparator(greaterThan),
    descendingByPublishDate = useWith(descending, getWith('published'), getWith('published'));

function sortByPublishDate(group, recs) {
    return sortBy(descendingByPublishDate)(recs);
}

var finished = mapObjectWith(sortByPublishDate)(finalgroups);

// Part 3, but 'composed'
var mostRecentByTagOrderedByPublishDate = pipeline(
    filterWith(within30Days),
    pairWith(getWith('tags')),
    groupBy(getWith(1)),
    mapObjectWith(getPostRecords),
    mapObjectWith(sortByPublishDate)
);

// Same output as 'finished' above
var composed_finished = mostRecentByTagOrderedByPublishDate(records);