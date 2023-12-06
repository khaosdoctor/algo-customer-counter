For the purposes of this interview, imagine that we own a store. This
store doesn't always have customers shopping: there might be some long
stretches of time where no customers enter the store. We've asked our
employees to write simple notes to keep track of when customers are
shopping and when they aren't by simply writing a single letter every
hour: 'Y' if there were customers during that hour, 'N' if the store
was empty during that hour.

For example, our employee might have written "Y Y N Y", which means
the store was open for four hours that day, and it had customers
shopping during every hour but its third one.

hour: | 1 | 2 | 3 | 4 |
log: | Y | Y | N | Y |
^
|
No customers during hour 3

We suspect that we're keeping the store open too long, so we'd like to
understand when we _should have_ closed the store. For simplicity's
sake, we'll talk about when to close the store by talking about how
many hours it was open: if our closing time is `2`, that means the
store would have been open for two hours and then closed.

hour: | 1 | 2 | 3 | 4 |
log: | Y | Y | N | Y |
closing_time: 0 1 2 3 4
^ ^
| |
before hour #1 after hour #4

(A closing time of 0 means we simply wouldn't have opened the store at
all that day.)

First, let's define a "penalty": what we want to know is "how bad
would it be if we had closed the store at a given hour?" For a given
log and a given closing time, we compute our penalty like this:

+1 penalty for every hour that we're _open_ with no customers
+1 penalty for every hour that we're _closed_ when customers would have shopped

For example:

hour: | 1 | 2 | 3 | 4 | penalty = 3:
log: | Y | Y | N | Y | (three hours with customers after closing)
penalty: | _ | _ | | \* |
^
|
closing_time = 0

hour: | 1 | 2 | 3 | 4 | penalty = 2:
log: | N | Y | N | Y | (one hour without customers while open +
penalty: | _ | | | _ | one hour with customers after closing)
^
|
closing_time = 2

hour: | 1 | 2 | 3 | 4 | penalty = 1
log: | Y | Y | N | Y | (one hour without customers while open)
penalty: | | | \* | |
^
|
closing_time = 4

Note that if we have a log from `n` open hours, the `closing_time`
variable can range from 0, meaning "never even opened", to n, meaning
"open the entire time".

1.  Write a function `compute_penalty` that computes the total penalty, given
    a store log (as a space separated string) AND
    a closing time (as an integer)

In addition to writing this function, you should use tests to
demonstrate that it's correct. Do some simple testing, and then quickly
describe a few other tests you would write given more time.

## Examples

compute_penalty("Y Y N Y", 0) should return 3
compute_penalty("N Y N Y", 2) should return 2
compute_penalty("Y Y N Y", 4) should return 1

# Second Exercise

Compute the best closing time for a given store log. Write a function `best_closing_time` that computes the best closing time for a given store log (as a space separated string). In addition to writing this function, you should use tests to demonstrate that it's correct. Do some simple testing, and then quickly describe a few other tests you would write given more time. (You can assume that there is a unique best closing time.)

## Examples

best_closing_time("Y Y N Y") should return 4
best_closing_time("N Y N Y") should return 2
best_closing_time("Y Y Y Y") should return 4
best_closing_time("N N N N") should return 0

# Third Exercise

Now the employees will write the logs in a paper separated by lines, using BEGIN and END to mark the start and end of the log. For example:

BEGIN Y Y N Y END

However they always forget to write END or BEGIN, so we need to extract from the logs, a good log, that is, a log that starts with BEGIN and ends with END. Then we should apply the previous functions to this log and get an array of best closing times.

## Examples

best_closing_time("BEGIN Y Y N Y END") should return [2]
best_closing_time("BEGIN N Y N Y") should return []
best_closing_time("Y Y Y Y END") should return []
best_closing_time("BEGIN N N N N END") should return [0]
best_closing_time("BEGIN Y Y N Y END\nBEGIN Y Y N Y END") should return [2, 2]
