'use client';
import useScale, { withScale } from '../use-scale';
import { hexToRgb } from '../utils/color';
import React from 'react';
import useTheme from '../use-theme';
import PageWidth from '../page-width';
import { GradientContentProps } from '.';

type NativeAttrs = Omit<React.HTMLAttributes<any>, keyof GradientContentProps>;
export type CardContentProps = GradientContentProps & NativeAttrs;

const GradientContentComponent: React.FC<React.PropsWithChildren<CardContentProps>> = ({ children, maxHeight = '50vh', ...props }) => {
  const theme = useTheme();
  const { SCALES } = useScale();
  const rgba = `rgba(${hexToRgb(theme.palette.accents_1)}, 0.5)`;
  const defaultGradient = `linear-gradient(to bottom, ${rgba}, ${theme.palette.background})`;
  return (
    <div className="gradient-layout" {...props}>
      <div className="gradient-content">
        <div className="bg-gradient">{props.img}</div>
        <div className="gradient-space">
          <PageWidth>{children}</PageWidth>
        </div>
      </div>
      <style jsx>{`
        .gradient-content {
          width: ${SCALES.w(0, '100%')};
          height: ${SCALES.h(0, '100%')};

          margin: ${SCALES.mt(0)} ${SCALES.mr(0)} ${SCALES.mb(0)} ${SCALES.ml(0)};
          position: relative;
        }
        .gradient-layout {
          background: ${theme.palette.background};
          height: 100%;
          padding: ${SCALES.pt(0)} ${SCALES.pr(0)} ${SCALES.pb(0)} ${SCALES.pl(0)};
        }
        .gradient-space {
          position: relative;
        }
        .bg-gradient {
          position: absolute;
          background: ${props.gradient || defaultGradient};
          width: 100%;
          z-index: 0;
          max-height: ${maxHeight};
          left: 0;
          top: 0;
          height: 100%;
        }
      `}</style>
    </div>
  );
};

GradientContentComponent.displayName = 'GradientContent';
const GradientContent = withScale(GradientContentComponent);
export default GradientContent;
