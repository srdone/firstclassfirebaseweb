// A method that takes the id of a requirement (or award) and returns true if it is complete
// returns false if it is not complete

var masterReqirementArray = [
  {id: "a", doPrereqCount: 1, prereqs: ["b", "c"]},
  {id: "b"},
  {id: "c", doPrereqCount: 2, prereqs: ["d", "e"]},
  {id: "d"},
  {id: "e"}
];

var masterReqById = masterRequirementArray.reduce(function(previous, current) {
  previous[current.id] = current;
}, {});

var completedTest1 = ["d", "e"]; // c can be marked complete
var completedTest2 = ["b", "c"]; // a cant' be marked complete - d and e not complete
var completedTest3 = ["b", "c", "d", "e"]; //a can be marked complete

function isComplete(id, completedReqIds) {
  // returns true if the id is found in the list
  return (completedReqIds.indexOf(id) !== -1);
}

// parameters: requirement id, completedReqIds
// returns: boolean
// Checks to see if the prereqs for the listed id are complete
// Not all prereqs are required, so we count to see if we have done enough of them
function prereqsComplete(reqId, completedReqIds) {
  //check only immediate prereqs
  var req = masterReqById[reqId];
  var prereqsCompleteCount = 0;
  for (var i = 0; i < req.prereqs.length; i++) {
    // increase prereqsCompleteCount by 1 each time we find one that is complete
    if (completedReqIds.indexOf(req.prereqs[i]) !== -1) {
      prereqsCompleteCount++;
    }
  }
  // check to make sure we completed enough prereqs
  var result = (prereqsCompleteCount >= req.numReqPrereqs);
  return result;
}

// Method on the scout object
// parameters: reqId - completed requirement id
// returns: true if successful, false if not successful
// Checks to see if the prereqs for the requirement have already been completed by
// the scout. If they have, adds the requirement to the scout's list of completed
// requirements and returns true. Returns false if not.
function markReqComplete(reqId) {
  if (prereqsComplete(reqId, this.reqsCompleted)) {
    // push a new object onto the reqsCompleted array of the scout
    // should include a reqId and the current date
    var completedReq = {
      reqId: reqId,
      dateCompleted: new Date()
    };
    this.reqsCompleted.push(completedReq);
    return true;
  }
  return false;
}

// Method on the scout object
// returns: the current rank of the scout
// Filters through the list of completed requirements for the ranks that are complete
// returns the rank with the highest order value
function currentRank() {
  
}

function getCompletedReqs();

function addCompletedReq();

function removeCompletedReq();

function setCompletedReqs();
