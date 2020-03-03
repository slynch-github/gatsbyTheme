const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const fs = require("fs")

//1. make sure the pages directory exists
//if the pages directory does not exist, it will create it

exports.onPreBootstrap = ({ reporter }, options) => {
    const contentPath = options.contentPath || "blog"

    if(!fs.existsSync(contentPath)){
        reporter.info(`creating the ${contentPath} directory`)
        fs.mkdirSync(contentPath)
    }
}

//create a slug field

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode })
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
}

//query for results and create pages

exports.createPages = async ({ graphql, actions }, options) => {
  const blogPath = "blog"
  const { createPage } = actions
  createPage({
    path: blogPath,
    component: require.resolve(`./src/templates/blog-listing.js`)
  })
  const blogPost = require.resolve(`./src/templates/blog-post.js`)
  const blogResult = await graphql(
    `
      query {
        allMarkdownRemark(filter: {parent: {}, fileAbsolutePath: {regex: "/blog/"}})
          {
          edges {
            node {
              fields {
                slug
              }
              html
              frontmatter {
                title,
                tags,
                date(formatString: "MMMM DD, YYYY"),
                description
              }
            }
          }
        }
      }
    `
  )

  if (blogResult.errors) {
    throw blogResult.errors
  }

  // Create blog posts pages.
  const blogPosts = blogResult.data.allMarkdownRemark.edges

  blogPosts.forEach((post, index) => {
    const previous = index === blogPosts.length - 1 ? null : blogPosts[index + 1].node
    const next = index === 0 ? null : blogPosts[index - 1].node

    createPage({
      path: blogPath + post.node.fields.slug,
      component: blogPost,
      context: {
        title: post.node.frontmatter.title,
        date: post.node.frontmatter.date,
        tags: post.node.frontmatter.tags,
        description: post.node.frontmatter.description,
        html: post.node.html,
        slug: post.node.fields.slug,
        blogPath,
        previous,
        next,
      },
    })
  })


    const portfolioPath = "portfolio"
    createPage({
      path: portfolioPath,
      component: require.resolve(`./src/templates/portfolio-listing.js`)
    })
    const portfolioPost = require.resolve(`./src/templates/portfolio-post.js`)
    const result = await graphql(
      `
        query {

          allMarkdownRemark(filter: {parent: {}, fileAbsolutePath: {regex: "/portfolio/"}})
          {
            edges {
              node {
                fields {
                  slug
                }
                html
                frontmatter {
                  title,
                  tags,
                  date(formatString: "MMMM DD, YYYY"),
                  description
                }
              }
            }
          }
        }
      `
    )

    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const portfolioPosts = result.data.allMarkdownRemark.edges

    portfolioPosts.forEach((post, index) => {
      const previous = index === portfolioPosts.length - 1 ? null : portfolioPosts[index + 1].node
      const next = index === 0 ? null : portfolioPosts[index - 1].node

      createPage({
        path: portfolioPath + post.node.fields.slug,
        component: portfolioPost,
        context: {
          title: post.node.frontmatter.title,
          date: post.node.frontmatter.date,
          tags: post.node.frontmatter.tags,
          description: post.node.frontmatter.description,
          html: post.node.html,
          slug: post.node.fields.slug,
          portfolioPath,
          previous,
          next,
        },
      })
    })
  }
















