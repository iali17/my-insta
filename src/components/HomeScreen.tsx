import React, { Suspense } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { PostList } from './Posts';
import RelayEnvironment from '../RelayEnvironment';
import { graphql } from 'babel-plugin-relay/macro';
import { useHistory } from 'react-router-dom';
import {
  loadQuery,
} from 'react-relay/hooks';

export const HomeScreenQuery = graphql`
query HomeScreenQuery {
  viewer {
    allPosts {
      edges {
        node{
        	id
          user
          image_url
          description
          comments {
            id
            user
            text
          }
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
}
`;

const preloadedHomeScreenQuery = loadQuery(RelayEnvironment, HomeScreenQuery, {});

export function HomeScreen() {
  const history = useHistory();

  return(
    <Container>
      <Row>
        <Col>
          <Button onClick={() => history.push('/new/post')}>New Post</Button>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col className="col-6">
          <Suspense fallback={'Loading posts...'}>
            <PostList preloadedQuery={preloadedHomeScreenQuery}/>
          </Suspense>
        </Col>
      </Row>
    </Container>
  )
}