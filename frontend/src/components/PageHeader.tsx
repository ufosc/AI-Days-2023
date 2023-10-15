import myImage from '../assets/header.png'
import { Image } from 'react-bootstrap'

function PageHeader() {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          background: 'black',
        }}
      >
        <Image
          src={myImage}
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </div>

      <div
        id='gnav20-promo-placeholder'
        className='enableAuthPZN'
        style={{
          background: '#5b5b5b',
          paddingTop: 12,
          paddingBottom: 12,
          fontSize: 14,
        }}
      >
        <div>
          <div className='gnav20-ribbontext'>
            <div className='gnav20-promo-ribbon-wrapper gnav20-clearfix'>
              <div className='gnav20-promo'>
                <div className='gnav20-promotext opacityOne'>
                  <div className='gnav20-promo-ribbon' item-title='promoRibbon'>
                    <div
                      className='gnav20-promo-text gnav20-white-focus'
                      style={{
                        color: 'white',
                        textAlign: 'center',
                      }}
                    >
                      <span>
                        Have a phone you love? Get up to $540 when you{' '}
                        <a
                          href='https://www.verizon.com/bring-your-own-device/'
                          data-track='global nav:bring your phone'
                        >
                          bring your phone
                        </a>
                        . Or get iPhone 14 Pro or iPhone 14 on us. Online only.
                        With Unlimited Ultimate.{' '}
                        <a
                          href='https://www.verizon.com/smartphones/apple/?condition=new&amp;sort=best-sellers'
                          data-track='global nav:buy now'
                        >
                          Buy now
                        </a>
                        <span style={{ color: '#6F7171' }}>
                          &nbsp;&nbsp;|&nbsp;
                        </span>
                        <span className='gnav20-promo-icon'>
                          <a
                            href='javascript:void(0);'
                            aria-label='Offer Details'
                            data-track='global nav:offer details'
                          >
                            Offer Details
                          </a>
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageHeader
