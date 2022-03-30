import React from "react"
import { requireAuth } from "../components/auth"
import { useProfile } from "../components/db"
import * as links from "../components/links"
import { createPage } from "../components/page"
import SelectLegislators from "../components/SelectLegislators"
import MyTestimonies from "../components/MyTestimonies/MyTestimonies"
import { Row, Col, FormControl, Spinner } from "react-bootstrap"

export default createPage({
  v2: true,
  title: "Profile",
  Page: requireAuth(({ user: { displayName } }) => {
    const profile = useProfile()
    return (
      <>
        <h1>
          Hello, {displayName ? decodeHtmlCharCodes(displayName) : "Anonymous"}!
        </h1>
        <p>
          Please use the{" "}
          <links.External href="https://malegislature.gov/Search/FindMyLegislator">
            find your legislator
          </links.External>{" "}
          tool and select your State Representative and Senator below.
        </p>
        <Row>
          <Col>
            {" "}
            <SelectLegislators />
          </Col>
          <Col></Col>
        </Row>
        About me:
        <textarea className="form-control col-sm" rows={5} required />
        <Row className="mt-3">
          <Col>
            <FormControl
              placeholder="Twitter username"
              aria-label="Twitter username"
              aria-describedby="basic-addon1"
            />
          </Col>
          <Col>
            <FormControl
              placeholder="LinkedIn username"
              aria-label="LinkedIn username"
              aria-describedby="basic-addon1"
            />
          </Col>
          <Col></Col>
        </Row>
        {!profile.loading ? (
          <div className="form-check mt-3 mb-2">
            <input
              className="form-check-input"
              type="checkbox"
              id="flexCheckChecked"
              defaultChecked={true}
              checked={profile.profile?.public ?? true} // complete when OnChange is ready
              onChange={e => {
                profile.updateIsPublic(e.target.checked)
              }}
            />
            <label className="form-check-label" htmlFor="flexCheckChecked">
              Allow others to see my profile&nbsp;
            </label>
            {profile.updatingIsPublic ? (
              <Spinner animation="border" className="mx-auto" size="sm" />
            ) : null}
          </div>
        ) : null}
        <MyTestimonies />
      </>
    )
  })
})

const decodeHtmlCharCodes = (s: string) =>
  s.replace(/(&#(\d+);)/g, (match, capture, charCode) =>
    String.fromCharCode(charCode)
  )
