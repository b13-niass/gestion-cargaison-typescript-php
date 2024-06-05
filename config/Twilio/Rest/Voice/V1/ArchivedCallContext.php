<?php

/**
 * This code was generated by
 * ___ _ _ _ _ _    _ ____    ____ ____ _    ____ ____ _  _ ____ ____ ____ ___ __   __
 *  |  | | | | |    | |  | __ |  | |__| | __ | __ |___ |\ | |___ |__/ |__|  | |  | |__/
 *  |  |_|_| | |___ | |__|    |__| |  | |    |__] |___ | \| |___ |  \ |  |  | |__| |  \
 *
 * Twilio - Voice
 * This is the public Twilio REST API.
 *
 * NOTE: This class is auto generated by OpenAPI Generator.
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


namespace Twilio\Rest\Voice\V1;

use Twilio\Exceptions\TwilioException;
use Twilio\Version;
use Twilio\InstanceContext;


class ArchivedCallContext extends InstanceContext
    {
    /**
     * Initialize the ArchivedCallContext
     *
     * @param Version $version Version that contains the resource
     * @param \DateTime $date The date of the Call in UTC.
     * @param string $sid The Twilio-provided Call SID that uniquely identifies the Call resource to delete
     */
    public function __construct(
        Version $version,
        $date,
        $sid
    ) {
        parent::__construct($version);

        // Path Solution
        $this->solution = [
        'date' =>
            $date,
        'sid' =>
            $sid,
        ];

        $this->uri = '/Archives/' . \rawurlencode($date->format('Y-m-d'))
        .'/Calls/' . \rawurlencode($sid)
        .'';
    }

    /**
     * Delete the ArchivedCallInstance
     *
     * @return bool True if delete succeeds, false otherwise
     * @throws TwilioException When an HTTP error occurs.
     */
    public function delete(): bool
    {

        return $this->version->delete('DELETE', $this->uri);
    }


    /**
     * Provide a friendly representation
     *
     * @return string Machine friendly representation
     */
    public function __toString(): string
    {
        $context = [];
        foreach ($this->solution as $key => $value) {
            $context[] = "$key=$value";
        }
        return '[Twilio.Voice.V1.ArchivedCallContext ' . \implode(' ', $context) . ']';
    }
}
